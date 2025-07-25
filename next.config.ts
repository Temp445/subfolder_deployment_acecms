import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig  = {
  basePath: '/products/ace-calibration-management-system-on-cloud',
  trailingSlash: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'px.ads.linkedin.com',  // for linkedin Tracking
            },
        ],
        unoptimized: true,
    },

};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

 
