# Anime Albums Website Template

A modern, responsive anime album collection website template built with Next.js. This template provides a beautiful and interactive way to showcase your anime collection with features like video backgrounds, weather effects, and Live2D character interactions.

## Deploy

[![Deploy to EdgeOne](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://edgeone.ai/pages/new?template=https://github.com/tomcomtang/anime-albums-website&output-directory=./out&build-command=npm%20run%20build)

[More Templates](https://edgeone.ai/pages/templates)

You can quickly deploy this template to EdgeOne with just one click. The deployment process will automatically:
- Set up the Next.js environment
- Install all dependencies
- Configure the build settings
- Deploy to a production-ready environment

## Features

- 🎥 Dynamic video background carousel
- 🌤️ Interactive weather effects (rain, snow, sunny)
- 🎭 Live2D character with interactive responses
- 📱 Fully responsive design
- 🌐 Multi-language support
- 🎨 Dark/Light theme support
- 📂 Category-based gallery layouts
- 🔄 Infinite scroll loading
- 🖼️ Beautiful image modal with navigation

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animation**: Framer Motion
- **Live2D**: Live2D Widget
- **Data Source**: AniList GraphQL API

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tomcomtang/anime-albums-website.git
cd anime-albums-website
```

2. Install dependencies:
```bash
yarn install
```

3. Fetch initial anime data:
```bash
node scripts/fetch-anilist-data.js
```
This script will fetch anime data from AniList API and generate configuration files in the `public/data` directory.

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
# or
yarn build
```

If you want to update the anime data every time you deploy, you can modify the build script in `package.json`:

```json
{
  "scripts": {
    "build": "node scripts/fetch-anilist-data.js && next build"
  }
}
```

Then, you can start the production server:

```bash
npm run start
# or
yarn start
```

## Customization

### Anime Data

The website uses JSON configuration files in the `public/data` directory for anime data. You can customize the content by:

1. Modifying the existing JSON files in `public/data`
2. Running the `fetch-anilist-data.js` script with different parameters
3. Creating your own JSON files following the same structure

### Weather Effects

Weather effects can be customized in:
- `components/weather/weather-effects.tsx`
- `app/globals.css` (weather-related styles)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── [locale]/          # Internationalization routes
│   ├── gallery/           # Gallery pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── gallery/          # Gallery components
│   ├── live2d/           # Live2D components
│   └── weather/          # Weather effect components
├── lib/                   # Utility functions
├── public/               # Static files
│   ├── data/            # Anime data JSON files
│   └── videos/          # Background videos
└── scripts/             # Utility scripts
    └── fetch-anilist-data.js  # Data fetching script
```

## License

This project is licensed under the MIT License. For commercial use, please refer to the licensing terms of [Live2D](https://www.live2d.com/en/terms/) and [AniList](https://anilist.gitbook.io/anilist-apiv2-docs/overview/rate-limiting).

## References

- [AniList GraphQL API](https://anilist.gitbook.io/anilist-apiv2-docs/) - Anime data source
- [Live2D Widget](https://github.com/stevenjoezhang/live2d-widget) - Live2D integration
