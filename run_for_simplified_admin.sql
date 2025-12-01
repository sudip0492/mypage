-- SQL Queries to Run in Supabase SQL Editor for Simplified Admin

-- Define ADMIN_POST_AUTHOR_ID
-- This UUID will be used for all posts created by the simplified admin.
-- It does NOT correspond to a Supabase auth.users entry in this simplified model.
DO $$
DECLARE
    ADMIN_POST_AUTHOR_UUID UUID := 'bbaef867-3d53-45ff-be91-6583bb33f83d';
BEGIN

    -- Step 1: Remove Foreign Key constraints
    -- For posts table: Drop the foreign key referencing auth.users(id)
    ALTER TABLE public.posts DROP CONSTRAINT IF EXISTS posts_author_id_fkey;

    -- For images table: Drop the foreign key referencing auth.users(id)
    ALTER TABLE public.images DROP CONSTRAINT IF EXISTS images_uploaded_by_fkey;


    -- Step 2: Update existing posts/images author_id to a fixed ADMIN_POST_AUTHOR_ID (OPTIONAL)
    -- This assigns any existing posts/images to the new fixed admin ID.
    -- Uncomment the UPDATE statements below if you have existing data you want to reassign.
    -- UPDATE public.posts SET author_id = ADMIN_POST_AUTHOR_UUID WHERE author_id IS NOT NULL;
    -- UPDATE public.images SET uploaded_by = ADMIN_POST_AUTHOR_UUID WHERE uploaded_by IS NOT NULL;


    -- Step 3: Modify RLS Policies to allow access without auth.uid() checks

    -- For posts table:
    -- Remove old RLS policies
    DROP POLICY IF EXISTS "Public posts are viewable by everyone." ON public.posts;
    DROP POLICY IF EXISTS "Authors can view, insert, update, and delete their own posts." ON public.posts;

    -- NEW: Drop the new policies if they already exist before recreating them
    DROP POLICY IF EXISTS "Allow all authenticated to insert posts" ON public.posts;
    DROP POLICY IF EXISTS "Allow all authenticated to update posts" ON public.posts;
    DROP POLICY IF EXISTS "Allow all authenticated to delete posts" ON public.posts;


    -- New policy to allow SELECT for all published posts (same as before)
    CREATE POLICY "Public posts are viewable by everyone." ON public.posts
      FOR SELECT USING (status = 'published');

    -- New policies to allow INSERT, UPDATE, DELETE for anyone authenticated (or no auth)
    -- This effectively removes any ownership check for these operations via RLS.
    CREATE POLICY "Allow all authenticated to insert posts" ON public.posts
      FOR INSERT WITH CHECK (TRUE);

    CREATE POLICY "Allow all authenticated to update posts" ON public.posts
      FOR UPDATE USING (TRUE) WITH CHECK (TRUE);

    CREATE POLICY "Allow all authenticated to delete posts" ON public.posts
      FOR DELETE USING (TRUE);


    -- For images table:
    -- Remove old RLS policies
    DROP POLICY IF EXISTS "Allow users to upload images" ON public.images; -- If you had one

    -- NEW: Drop the new policies if they already exist before recreating them
    DROP POLICY IF EXISTS "Allow all authenticated to insert images" ON public.images;
    DROP POLICY IF EXISTS "Allow all authenticated to update images" ON public.images;
    DROP POLICY IF EXISTS "Allow all authenticated to delete images" ON public.images;

    -- New policies to allow INSERT, UPDATE, DELETE for images
    CREATE POLICY "Allow all authenticated to insert images" ON public.images
      FOR INSERT WITH CHECK (TRUE);

    CREATE POLICY "Allow all authenticated to update images" ON public.images
      FOR UPDATE USING (TRUE) WITH CHECK (TRUE);

    CREATE POLICY "Allow all authenticated to delete images" ON public.images
      FOR DELETE USING (TRUE);

END $$;