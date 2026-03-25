-- MySQL Schema for Nordle Leaderboard
-- Run this script on your Cloud SQL MySQL instance to create the required tables.
-- Users are identified by their Apple Game Center player ID.
-- Leaderboard entries are tracked per language (no, en, sv, da).

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    game_center_id VARCHAR(255) NOT NULL UNIQUE,
    display_name VARCHAR(50) NOT NULL,
    opted_in BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT NOW(),
    updated_at DATETIME NOT NULL DEFAULT NOW()
);

CREATE TABLE leaderboard_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    language VARCHAR(2) NOT NULL DEFAULT 'no',
    daily_streak INT NOT NULL DEFAULT 0,
    total_words_solved INT NOT NULL DEFAULT 0,
    last_updated DATETIME NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT uq_user_language UNIQUE (user_id, language)
);

-- Indexes for efficient leaderboard queries
CREATE INDEX idx_leaderboard_streak ON leaderboard_entries(language, daily_streak DESC);
CREATE INDEX idx_leaderboard_total ON leaderboard_entries(language, total_words_solved DESC);
CREATE INDEX idx_users_game_center_id ON users(game_center_id);
CREATE INDEX idx_users_opted_in ON users(opted_in);

-- Migration: Add language column to existing leaderboard_entries
-- ALTER TABLE leaderboard_entries ADD COLUMN language VARCHAR(2) NOT NULL DEFAULT 'no';
-- ALTER TABLE leaderboard_entries ADD CONSTRAINT uq_user_language UNIQUE (user_id, language);
-- DROP INDEX idx_leaderboard_streak ON leaderboard_entries;
-- DROP INDEX idx_leaderboard_total ON leaderboard_entries;
-- CREATE INDEX idx_leaderboard_streak ON leaderboard_entries(language, daily_streak DESC);
-- CREATE INDEX idx_leaderboard_total ON leaderboard_entries(language, total_words_solved DESC);
