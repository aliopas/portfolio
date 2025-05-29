import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      { // Added for OpenWeatherMap icons (though we are switching, good to keep for a bit)
        protocol: 'https',
        hostname: 'openweathermap.org',
        port: '',
        pathname: '/img/wn/**',
      },
      { // Added for WeatherAPI.com icons
        protocol: 'https',
        hostname: 'cdn.weatherapi.com',
        port: '',
        pathname: '/weather/64x64/**',
      }
    ],
  },
};

export default nextConfig;
