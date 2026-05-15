-- Run in Supabase SQL Editor if you are not using the CLI migration workflow.
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS user_id TEXT;

ALTER TABLE profiles
DROP CONSTRAINT IF EXISTS profiles_user_id_key;

ALTER TABLE profiles
ADD CONSTRAINT profiles_user_id_key UNIQUE (user_id);
