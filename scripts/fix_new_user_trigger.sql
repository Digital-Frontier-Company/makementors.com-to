-- Fix for the handle_new_user function to make it more resilient.
-- This version only inserts the user's ID and email, which are guaranteed
-- to be present during any user creation event (signup, invite, etc.).
-- Other profile information like full_name and username can be added by the user later.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Re-grant execute permission to the authenticated role
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO authenticated;
