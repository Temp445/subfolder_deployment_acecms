import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig  = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'px.ads.linkedin.com',  // for linkedin Tracking
            },
        ],
    },
//   basePath: '/acecms',
//   assetPrefix: '/acecms',
//   trailingSlash: true,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

 
