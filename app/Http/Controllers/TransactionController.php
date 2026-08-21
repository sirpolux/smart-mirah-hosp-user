<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTransactionRequest;
use App\Models\Order;
use App\Models\Transaction;
use App\Models\Upload;
use App\Services\CloudinaryService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;

class TransactionController extends Controller
{
    public function __construct(
        private readonly CloudinaryService $cloudinary,
    ) {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransactionRequest $request): RedirectResponse
    {

       // dd($request->all());
        $user = Auth::user();

        $order = Order::where('id', $request->order_id)
            ->where('user_id', $user->id)
            ->first();

        if (!$order) {
            return Redirect::back()->with('flash', [
                'error' => 'Order not found.',
            ]);
        }

        if (in_array($order->status, [Order::STATUS_DELIVERED, Order::STATUS_CANCELLED], true)) {
            return Redirect::back()->with('flash', [
                'error' => 'Payment evidence can no longer be uploaded for this order.',
            ]);
        }

        DB::beginTransaction();

        try {
            $uploaded = $this->cloudinary->upload($request->file('evidence'), 'smart_mirah_hospitality');

            $transaction = Transaction::create([
                'user_id' => $user->id,
                'order_id' => $order->id,
                'amount' => $order->total_price,
                'description' => $request->description,
                'status' => Transaction::STATUS_PENDING,
                'purpose' => 'payment',
            ]);

            Upload::create([
                'transaction_id' => $transaction->id,
                'public_id' => $uploaded['public_id'],
                'file_path' => $uploaded['url'],
                'file_type' => $request->file('evidence')->getMimeType(),
                'is_primary' => true,
                'position' => 0,
                'uploaded_by' => $user->id,
            ]);

            DB::commit();

            return Redirect::back()->with('flash', [
                'success' => 'Payment evidence uploaded successfully. Awaiting confirmation.',
            ]);
        } catch (\Throwable $e) {
            DB::rollBack();

            return Redirect::back()->with('flash', [
                'error' => 'Failed to upload payment evidence. Please try again.',
            ]);
        }
    }
}
