# Mark3d
A mobile app marketplace for buying/selling secondhand items — with immersive 3D models for every product.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   - Open `.env` and update with your Supabase credentials:
     - `SUPABASE_URL`: Your Supabase project URL
     - `SUPABASE_ANON_KEY`: Your Supabase anonymous key
   
   You can find these values in your Supabase project settings under Project Settings > API.

3. Start the development server:
```bash
npm start
```

## Features
- Upload and list products with images
- View products in a grid layout
- Pull to refresh product listings
- Automatic image compression for faster loading
