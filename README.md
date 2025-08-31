<div align="center">

# 🏠 DashMapp

**A modern, self-hosted home dashboard for organizing your digital life**

[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](https://docker.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript)](https://typescriptlang.org)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

*Inspired by Homarr and Dashy, built with modern web technologies*

[🚀 Quick Start](#-quick-start) • [✨ Features](#-features) • [🐳 Docker](#-docker-deployment) • [⚙️ Configuration](#️-configuration)

</div>

---

## ✨ Features

### 🎯 **Core Functionality**
- **Clean Interface** - Modern, intuitive design with customizable layouts
- **App Management** - Add, edit, and organize your favorite applications
- **Category System** - Group apps by type, function, or any custom organization
- **Responsive Design** - Perfect on desktop, tablet, and mobile devices

### 🎨 **Customization**
- **Grid Layouts** - Adjustable grid size (2-8 columns) to fit your screen
- **Theme Support** - Beautiful dark and light themes
- **Compact Mode** - Space-saving layout option
- **Show/Hide Descriptions** - Toggle app descriptions for cleaner look

### 🔧 **Technical**
- **SQLite Database** - Lightweight, file-based storage
- **Docker Ready** - One-command deployment
- **No Authentication** - Simple, hassle-free access
- **Self-Hosted** - Complete control over your data

---

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/0wardriver0/DashMapp.git
cd DashMapp

# Start the application
docker-compose up -d
```

### Option 2: Manual Docker

```bash
# Build and run
docker build -t dashmapp .
docker run -d --name dashmapp -p 3000:3000 -v $(pwd)/data:/app/data dashmapp
```

### Option 3: Development

```bash
# Install dependencies
npm install

# Initialize database
npm run db:init

# Start development server
npm run dev
```

**🌐 Access your dashboard at:** `http://localhost:3000`

---

## 🐳 Docker Deployment

### Production Deployment

```yaml
# docker-compose.yml

services:
  dashmapp:
    image: dashmapp:latest
    container_name: dashmapp
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Application port |
| `NODE_ENV` | `production` | Runtime environment |

---

## ⚙️ Configuration

### 📊 Dashboard Settings

Access settings via the gear icon in the top-right corner:

- **Grid Size**: 2-8 columns
- **Theme**: Light/Dark mode toggle
- **Compact Mode**: Reduced padding and spacing
- **Show Descriptions**: Toggle app descriptions

### 📂 Categories

Organize your apps with custom categories:

1. Click **"Manage Categories"** in settings
2. Add, edit, or delete categories
3. Assign apps to categories when adding/editing

### 🗄️ Database

- **Location**: `./data/dashboard.db`
- **Type**: SQLite
- **Backup**: Simply copy the `data` directory

---

## 🎯 Usage Guide

### Adding Your First App

1. **Click the "+" button** in the top-right corner
2. **Fill in the details**:
   - Name (e.g., "Plex Media Server")
   - URL (e.g., "http://192.168.1.100:32400")
   - Description (optional)
   - Icon URL (optional)
   - Category (optional)
3. **Click "Add App"**

### Managing Categories

1. **Open Settings** (gear icon)
2. **Click "Manage Categories"**
3. **Add categories** like "Media", "Monitoring", "Home Automation"
4. **Assign colors** for visual organization

### Customizing Layout

- **Grid Size**: Adjust columns based on your screen size
- **Compact Mode**: Enable for more apps per screen
- **Theme**: Switch between light and dark modes

---

## 🛠️ Development

### Project Structure

```bash
dashmapp/
├── app/                 # Next.js app directory
├── components/          # React components
├── lib/                # Utilities and database
├── scripts/            # Database initialization
├── public/             # Static assets
└── docker-compose.yml  # Docker configuration
```

### Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by [Homarr](https://github.com/ajnart/homarr) and [Dashy](https://github.com/Lissy93/dashy)
- Built with [Next.js](https://nextjs.org) and [shadcn/ui](https://ui.shadcn.com)
- Icons by [Lucide](https://lucide.dev)

---

<div align="center">

**⭐ Star this repo if you find it useful!**

Made with ❤️ for the self-hosting community

</div>
