-- Initialize SQLite database for home dashboard
-- This script creates the apps table to store dashboard applications

CREATE TABLE IF NOT EXISTS apps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_apps_name ON apps(name);

-- Insert some sample data
INSERT OR IGNORE INTO apps (id, name, url, description, icon) VALUES 
(1, 'Plex', 'https://plex.tv', 'Media server for movies and TV shows', 'https://www.plex.tv/wp-content/uploads/2018/01/plex-logo-dark.svg'),
(2, 'Home Assistant', 'https://home-assistant.io', 'Smart home automation platform', 'https://brands.home-assistant.io/homeassistant/icon.png'),
(3, 'Nextcloud', 'https://nextcloud.com', 'Self-hosted cloud storage and collaboration', 'https://nextcloud.com/wp-content/themes/next/assets/img/common/nextcloud-square-logo.png'),
(4, 'Grafana', 'https://grafana.com', 'Monitoring and observability platform', 'https://grafana.com/static/img/menu/grafana2.svg');
