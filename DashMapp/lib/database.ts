export interface App {
  id: number
  name: string
  url: string
  description: string | null
  icon: string | null
  category_id: number | null
  created_at: string
}

export interface NewApp {
  name: string
  url: string
  description: string | null
  icon: string | null
  category_id: number | null
}

export interface Category {
  id: number
  name: string
  created_at: string
}

export interface NewCategory {
  name: string
}

// Simple in-memory storage for demo purposes
// In a real app, you'd use SQLite or another database
const categories: Category[] = [
  {
    id: 1,
    name: "Media",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Home Automation",
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Monitoring",
    created_at: new Date().toISOString(),
  },
]

const apps: App[] = [
  {
    id: 1,
    name: "Plex",
    url: "https://plex.tv",
    description: "Media server for movies and TV shows",
    icon: "https://www.plex.tv/wp-content/uploads/2018/01/plex-logo-dark.svg",
    category_id: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Home Assistant",
    url: "https://home-assistant.io",
    description: "Smart home automation platform",
    icon: "https://brands.home-assistant.io/homeassistant/icon.png",
    category_id: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Nextcloud",
    url: "https://nextcloud.com",
    description: "Self-hosted cloud storage and collaboration",
    icon: "https://nextcloud.com/wp-content/themes/next/assets/img/common/nextcloud-square-logo.png",
    category_id: null,
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Grafana",
    url: "https://grafana.com",
    description: "Monitoring and observability platform",
    icon: "https://grafana.com/static/img/menu/grafana2.svg",
    category_id: 3,
    created_at: new Date().toISOString(),
  },
]

let nextAppId = 5
let nextCategoryId = 4

// App functions
export async function getApps(): Promise<App[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return [...apps].sort((a, b) => a.name.localeCompare(b.name))
}

export async function addApp(newApp: NewApp): Promise<App> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const app: App = {
    id: nextAppId++,
    ...newApp,
    created_at: new Date().toISOString(),
  }

  apps.push(app)
  return app
}

export async function updateApp(id: number, updates: Partial<NewApp>): Promise<App> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const index = apps.findIndex((app) => app.id === id)
  if (index === -1) {
    throw new Error("App not found")
  }

  apps[index] = { ...apps[index], ...updates }
  return apps[index]
}

export async function deleteApp(id: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const index = apps.findIndex((app) => app.id === id)
  if (index === -1) {
    throw new Error("App not found")
  }

  apps.splice(index, 1)
}

export async function getCategories(): Promise<Category[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return [...categories].sort((a, b) => a.name.localeCompare(b.name))
}

export async function addCategory(newCategory: NewCategory): Promise<Category> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const category: Category = {
    id: nextCategoryId++,
    ...newCategory,
    created_at: new Date().toISOString(),
  }

  categories.push(category)
  return category
}

export async function updateCategory(id: number, updates: Partial<NewCategory>): Promise<Category> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const index = categories.findIndex((category) => category.id === id)
  if (index === -1) {
    throw new Error("Category not found")
  }

  categories[index] = { ...categories[index], ...updates }
  return categories[index]
}

export async function deleteCategory(id: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const index = categories.findIndex((category) => category.id === id)
  if (index === -1) {
    throw new Error("Category not found")
  }

  // Remove category from apps
  apps.forEach((app) => {
    if (app.category_id === id) {
      app.category_id = null
    }
  })

  categories.splice(index, 1)
}
