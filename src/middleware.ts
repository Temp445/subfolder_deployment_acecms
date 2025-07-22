import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware'; // For language handling
import { routing } from './i18n/routing'; // Your custom routing configuration for next-intl

// Initialize the next-intl middleware
const intlMiddleware = createMiddleware(routing);

// List of regions to rewrite to the homepage
const regions = [
    'tn',  /* Tamil Nadu */
    'ka',  /* Karnataka */
    'mh',  /* Maharashtra */
    'dl',  /* Delhi */
    'ts',  /* Telangana */
    'hr',  /* Haryana */
    'se',   /* Singapore */
    'uaedxb', /* UAE Dubai */
    'uaesh', /* UAE Sharjah */
    'uaead' /* UAE Abu Dhabi */
]; // Add any other regions here

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the path is a region-specific path (e.g., /tn, /mh, /ap), redirect to /
    const regionPath = pathname.split('/')[1]; // Get the first segment after "/"

    // If the region is in the list, rewrite to the homepage
    if (regions.includes(regionPath)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Handle language-based paths with next-intl (e.g., /en/tn, /es/tn)
    const languagePattern = /^[a-z]{2}$/; // Assuming language codes are 2 letters (en, es, fr)
    const languagePrefix = pathname.split('/')[1]; // The first segment after the domain (like "en", "es")

    // If the language prefix is valid (2-letter code like "en", "es"), handle language paths
    if (languagePattern.test(languagePrefix)) {
        const regionInLanguagePath = pathname.split('/')[2]; // Check if it's something like /en/tn

        // If a region exists after the language prefix (like /en/tn), rewrite to /
        if (regions.includes(regionInLanguagePath)) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // Call next-intl middleware for language-based routing
    return intlMiddleware(request);
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|api|robots.txt|sitemap.xml|videos).*)'],
};



// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// import createMiddleware from 'next-intl/middleware'; //intl
// import { routing } from './i18n/routing'; //intl

// // middleware intl
// const intlMiddleware = createMiddleware(routing);

// // const allowedPaths = [
// //     'tn',  /* Tamil Nadu */
// //     'ka',  /* Karnataka */
// //     'mh',  /* Maharashtra */
// //     'dl',  /* Delhi */
// //     'ts',  /* Telangana */
// //     'hr',  /* Haryana */
// //     'se',   /* Singapore */
// //     'uaedxb', /* UAE Dubai */
// //     'uaesh', /* UAE Sharjah */
// //     'uaead' /* UAE Abu Dhabi */
// // ];

// export function middleware(request: NextRequest) {
//     const { pathname } = request.nextUrl;

//     // Match top-level paths like /ch, /global, /admin123
//     const match = pathname.match(/^\/([a-zA-Z0-9_-]+)(\/)?$/);
//     const pathSegment = match?.[1];

//     // ✅ Allow /auth to proceed normally
//     if (pathSegment === 'auth') {
//         return NextResponse.next();
//     }

//     // // ✅ Rewrite allowed paths to homepage
//     // if (pathSegment && allowedPaths.includes(pathSegment)) {
//     //     const url = request.nextUrl.clone();
//     //     url.pathname = '/';
//     //     return NextResponse.rewrite(url);
//     // }

//     // // ❌ Everything else goes to Not Found page
//     // if (pathname !== '/') {
//     //     const url = request.nextUrl.clone();
//     //     url.pathname = '/not-found';
//     //     return NextResponse.rewrite(url);
//     // }

//     // Allow homepage normally

//     return intlMiddleware(request);
// }

// export const config = {
//     matcher: ['/((?!_next/static|_next/image|favicon.ico|api|robots.txt|sitemap.xml|videos).*)'],
// };
