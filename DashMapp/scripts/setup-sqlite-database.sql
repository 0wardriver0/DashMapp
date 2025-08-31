-- Added SQLite database setup script for real database usage
-- This script sets up the SQLite database structure for the dashboard app
-- Run this to create the database.db file with proper tables

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create apps table
CREATE TABLE IF NOT EXISTS apps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  category_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE SET NULL
);

-- Insert default categories
INSERT OR IGNORE INTO categories (name) VALUES 
  ('Media'),
  ('Home Automation'),
  ('Monitoring');

-- Insert sample apps
INSERT OR IGNORE INTO apps (name, url, description, icon, category_id) VALUES 
  ('Plex', 'https://plex.tv', 'Media server for movies and TV shows', 'https://www.plex.tv/wp-content/uploads/2018/01/plex-logo-dark.svg', 1),
  ('Home Assistant', 'https://home-assistant.io', 'Smart home automation platform', 'https://brands.home-assistant.io/homeassistant/icon.png', 2),
  ('Nextcloud', 'https://nextcloud.com', 'Self-hosted cloud storage and collaboration', 'https://nextcloud.com/wp-content/themes/next/assets/img/common/nextcloud-square-logo.png', NULL),
  ('Grafana', 'https://grafana.com', 'Monitoring and observability platform', 'https://grafana.com/static/img/menu/grafana2.svg', 3);
