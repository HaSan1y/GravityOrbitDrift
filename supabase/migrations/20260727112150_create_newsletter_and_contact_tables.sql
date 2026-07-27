/*
# Create newsletter and contact tables for GravityOrbitDrift site

This is a single-tenant, no-auth public site. Visitors can subscribe to the
newsletter and submit contact messages without signing in. All policies are
therefore scoped to `anon, authenticated` so the anon-key frontend can write.

1. New Tables
- `newsletter_subscribers`
  - `id` (uuid, primary key)
  - `email` (text, unique, not null) — subscriber email
  - `created_at` (timestamptz, default now())
- `contact_messages`
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `email` (text, not null)
  - `message` (text, not null)
  - `created_at` (timestamptz, default now())

2. Security
- RLS enabled on both tables.
- Newsletter: anyone may insert a subscription; no public read (emails stay private).
- Contact: anyone may insert a message; no public read.
*/

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_newsletter" ON newsletter_subscribers;
CREATE POLICY "anon_insert_newsletter" ON newsletter_subscribers
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact" ON contact_messages;
CREATE POLICY "anon_insert_contact" ON contact_messages
  FOR INSERT TO anon, authenticated WITH CHECK (true);
