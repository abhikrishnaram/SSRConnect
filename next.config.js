/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'localhost',
            'picsum.photos',
            'images.unsplash.com',
            'cdn.sanity.io',
            'avatars.githubusercontent.com',
            'user-images.githubusercontent.com',
        ],
    }
}

module.exports = nextConfig
    