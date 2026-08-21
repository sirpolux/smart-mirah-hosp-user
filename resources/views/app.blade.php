@php
    $seoUrl = rtrim(config('seo.url'), '/');
    $seoDescription = config('seo.description');
    $seoImage = config('seo.image');
    $appName = config('app.name', 'Laravel');
    $currentPath = request()->getPathInfo();
    $canonicalUrl = $seoUrl . ($currentPath === '/' ? '/' : $currentPath);
    $organizationSchema = [
        '@context' => 'https://schema.org',
        '@type' => 'Organization',
        'name' => $appName,
        'url' => $seoUrl,
        'logo' => $seoUrl.'/images/logo-with-name.png',
        'description' => $seoDescription,
    ];
@endphp
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ $appName }}</title>

        <!-- Primary Meta -->
        <meta name="description" inertia content="{{ $seoDescription }}">
        <meta name="theme-color" content="#0f766e">
        <link rel="canonical" inertia href="{{ $canonicalUrl }}">

        <!-- Open Graph -->
        <meta property="og:site_name" content="{{ $appName }}">
        <meta property="og:type" inertia content="website">
        <meta property="og:title" inertia content="{{ $appName }}">
        <meta property="og:description" inertia content="{{ $seoDescription }}">
        <meta property="og:url" inertia content="{{ $canonicalUrl }}">
        <meta property="og:image" inertia content="{{ $seoImage }}">

        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" inertia content="{{ $appName }}">
        <meta name="twitter:description" inertia content="{{ $seoDescription }}">
        <meta name="twitter:image" inertia content="{{ $seoImage }}">

        <!-- Favicons -->
        <link rel="icon" type="image/x-icon" href="/favicon.ico">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="manifest" href="/site.webmanifest">

        <!-- Structured Data -->
        <script type="application/ld+json">@json($organizationSchema)</script>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
