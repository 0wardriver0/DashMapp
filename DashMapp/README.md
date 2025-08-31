# DashMapp

A modern, self-hosted home dashboard application for organizing and accessing your services and applications.

## Features

- 🎯 Clean, modern interface with customizable grid layouts
- 📱 Fully responsive design
- 🌙 Dark/Light theme support
- 📂 Category management for organizing apps
- ⚙️ Comprehensive settings panel
- 🗄️ SQLite database for persistent storage
- 🐳 Docker support for easy deployment

## Quick Start with Docker

### Option 1: Docker Compose (Recommended)

1. Clone or download the source code
2. Navigate to the project directory
3. Run the application:

\`\`\`bash
docker-compose up -d
\`\`\`

The application will be available at `http://localhost:3000`

### Option 2: Docker Build

\`\`\`bash
# Build the image
docker build -t dashmapp .

# Run the container
docker run -d \
  --name dashmapp \
  -p 3000:3000 \
  -v $(pwd)/data:/app/data \
  dashmapp
\`\`\`

## Data Persistence

The SQLite database is stored in the `./data` directory and is automatically mounted as a Docker volume. Your dashboard configuration and apps will persist between container restarts.

## Configuration

- **Port**: The application runs on port 3000 by default
- **Database**: SQLite database stored in `/app/data/dashboard.db`
- **Themes**: Supports both light and dark themes
- **Grid**: Configurable grid size from 2-8 columns

## Usage

1. Open your browser to `http://localhost:3000`
2. Click the "+" button to add your first app
3. Use the settings gear icon to customize your dashboard
4. Organize apps into categories for better management

## Development

To run in development mode:

\`\`\`bash
npm install
npm run dev
\`\`\`

## License

MIT License
