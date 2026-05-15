-- Admin reads all member profiles via email (admin has no profiles row).

DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;

CREATE POLICY "Admin email reads all profiles"
ON profiles
FOR SELECT
TO authenticated
USING ((auth.jwt() ->> 'email') = 'admin.mjchits@gmail.com');

-- Optional cleanup: remove old is_admin approach
ALTER TABLE profiles DROP COLUMN IF EXISTS is_admin;
