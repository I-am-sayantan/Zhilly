-- Zhilly calendar, D1 (SQLite). Safe to re-run: everything is IF NOT EXISTS / OR IGNORE.
-- Dates are "YYYY-MM-DD"; a block's `end` is the check-out day (not blocked itself).

-- One row per bookable unit. To add a room, run (with your own id):
--   npx wrangler d1 execute zhilly-calendar --remote --command "INSERT INTO rooms (id) VALUES ('room-2')"
-- The export-feed token is generated for you.
CREATE TABLE IF NOT EXISTS rooms (
  id    TEXT PRIMARY KEY CHECK (id <> '' AND id NOT GLOB '*[^a-z0-9-]*' AND length(id) <= 32),
  token TEXT NOT NULL DEFAULT (lower(hex(randomblob(16))))
);
INSERT OR IGNORE INTO rooms (id) VALUES ('room-1');

-- OTA iCal import links, one per room + source (e.g. booking, airbnb). Set on the admin page.
CREATE TABLE IF NOT EXISTS feeds (
  id         INTEGER PRIMARY KEY,
  room       TEXT NOT NULL REFERENCES rooms(id),
  source     TEXT NOT NULL,
  url        TEXT NOT NULL,
  last_ok    TEXT,
  last_error TEXT,
  last_count INTEGER,
  UNIQUE (room, source)
);

-- Blocked nights. source = 'direct' (admin page / confirmed enquiry) or an OTA feed's source name.
CREATE TABLE IF NOT EXISTS blocks (
  id     INTEGER PRIMARY KEY,
  room   TEXT NOT NULL REFERENCES rooms(id),
  source TEXT NOT NULL,
  start  TEXT NOT NULL,
  end    TEXT NOT NULL,
  note   TEXT
);
CREATE INDEX IF NOT EXISTS blocks_room ON blocks (room, source);

-- Booking enquiries from the website form.
CREATE TABLE IF NOT EXISTS enquiries (
  id       INTEGER PRIMARY KEY,
  created  TEXT NOT NULL,
  status   TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'confirmed', 'declined')),
  checkin  TEXT NOT NULL,
  checkout TEXT NOT NULL,
  room     TEXT,
  adults   INTEGER NOT NULL,
  children INTEGER NOT NULL,
  name     TEXT NOT NULL,
  phone    TEXT NOT NULL,
  email    TEXT NOT NULL,
  message  TEXT,
  ip       TEXT
);

-- Per-IP rate limit for /enquiry (rows older than a day are deleted as new ones come in).
CREATE TABLE IF NOT EXISTS hits (ip TEXT NOT NULL, at INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS hits_ip ON hits (ip, at);
