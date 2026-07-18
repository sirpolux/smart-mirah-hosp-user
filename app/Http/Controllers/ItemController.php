<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Http\Resources\ItemResource;
use App\Models\Item;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource (paginated for products page).
     */
    public function index()
    {
        $items = Item::with(['category', 'uploads', 'details'])
            ->where('status', 'available')
            ->where('deleted', false)
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        return ItemResource::collection($items);
    }

    /**
     * Get the latest available items for the home page.
     */
    public function latest()
    {
        $items = Item::with(['category', 'uploads', 'details'])
            ->where('status', 'available')
            ->where('deleted', false)
            ->orderBy('created_at', 'desc')
            ->take(8)
            ->get();

        return ItemResource::collection($items);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreItemRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Item $item)
    {
        $item->load(['category', 'uploads', 'details']);

        return new ItemResource($item);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Item $item)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateItemRequest $request, Item $item)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        //
    }
}
