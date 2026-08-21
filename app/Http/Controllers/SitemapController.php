<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    /**
     * Generate the XML sitemap: static pages + all available products.
     */
    public function __invoke(): Response
    {
        $baseUrl = rtrim(config('seo.url'), '/');

        $staticPages = [
            ['loc' => '/', 'priority' => '1.0', 'changefreq' => 'weekly'],
            ['loc' => '/about', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['loc' => '/services', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['loc' => '/contact', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['loc' => '/products', 'priority' => '0.9', 'changefreq' => 'daily'],
        ];

        $products = Item::query()
            ->where('status', 'available')
            ->where('deleted', false)
            ->orderBy('updated_at', 'desc')
            ->get(['id', 'updated_at'])
            ->map(fn (Item $item) => [
                'loc' => '/products/'.$item->id,
                'lastmod' => optional($item->updated_at)->toAtomString(),
                'priority' => '0.7',
                'changefreq' => 'weekly',
            ]);

        $urls = collect($staticPages)
            ->merge($products)
            ->map(fn (array $url) => view('sitemap.url', [
                'loc' => $baseUrl.$url['loc'],
                'lastmod' => $url['lastmod'] ?? null,
                'priority' => $url['priority'],
                'changefreq' => $url['changefreq'],
            ])->render())
            ->implode('');

        return response()
            ->view('sitemap.index', ['urls' => $urls])
            ->header('Content-Type', 'application/xml; charset=UTF-8');
    }
}
