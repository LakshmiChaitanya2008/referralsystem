-- Enforce max 4 direct children per parent in the database.

CREATE OR REPLACE FUNCTION public.enforce_max_direct_referrals()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  child_count INTEGER;
BEGIN
  IF NEW.parent_id IS NULL THEN
    RETURN NEW;
  END IF;

  SELECT COUNT(*)
  INTO child_count
  FROM public.profiles
  WHERE parent_id = NEW.parent_id
    AND id IS DISTINCT FROM NEW.id;

  IF child_count >= 4 THEN
    RAISE EXCEPTION 'Referral limit reached: a parent can have at most 4 direct members.';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enforce_max_direct_referrals_trigger ON public.profiles;

CREATE TRIGGER enforce_max_direct_referrals_trigger
BEFORE INSERT OR UPDATE OF parent_id ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.enforce_max_direct_referrals();
