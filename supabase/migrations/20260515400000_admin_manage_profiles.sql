-- Allow admin to create and update member profiles (link referrals).

DROP POLICY IF EXISTS "Admin email inserts profiles" ON profiles;
DROP POLICY IF EXISTS "Admin email updates profiles" ON profiles;

CREATE POLICY "Admin email inserts profiles"
ON profiles
FOR INSERT
TO authenticated
WITH CHECK ((auth.jwt() ->> 'email') = 'admin.mjchits@gmail.com');

CREATE POLICY "Admin email updates profiles"
ON profiles
FOR UPDATE
TO authenticated
USING ((auth.jwt() ->> 'email') = 'admin.mjchits@gmail.com')
WITH CHECK ((auth.jwt() ->> 'email') = 'admin.mjchits@gmail.com');
