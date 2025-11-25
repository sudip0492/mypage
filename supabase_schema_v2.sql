-- Create the 'comments' table
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  content TEXT NOT NULL,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable Row Level Security (RLS) for comments
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Policy for anyone to read comments
CREATE POLICY "Public comments are viewable by everyone." ON public.comments
  FOR SELECT USING (TRUE);

-- Policy for authenticated users to create comments
CREATE POLICY "Authenticated users can create comments." ON public.comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy for authenticated users to update their own comments
CREATE POLICY "Authenticated users can update their own comments." ON public.comments
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy for authenticated users to delete their own comments
CREATE POLICY "Authenticated users can delete their own comments." ON public.comments
  FOR DELETE USING (auth.uid() = user_id);


-- Create the 'likes' table
CREATE TABLE public.likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  UNIQUE (post_id, user_id) -- A user can only like a post once
);

-- Enable Row Level Security (RLS) for likes
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;

-- Policy for anyone to read likes
CREATE POLICY "Public likes are viewable by everyone." ON public.likes
  FOR SELECT USING (TRUE);

-- Policy for authenticated users to create likes
CREATE POLICY "Authenticated users can create likes." ON public.likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy for authenticated users to delete their own likes
CREATE POLICY "Authenticated users can delete their own likes." ON public.likes
  FOR DELETE USING (auth.uid() = user_id);
