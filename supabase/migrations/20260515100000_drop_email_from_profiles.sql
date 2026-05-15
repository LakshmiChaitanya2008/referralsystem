-- Run in Supabase SQL Editor after add_user_id migration.
ALTER TABLE profiles
DROP COLUMN IF EXISTS email;
