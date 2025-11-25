-- Create the 'posts' table
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Policy for anyone to read posts
CREATE POLICY "Public posts are viewable by everyone." ON public.posts
  FOR SELECT USING (TRUE);

-- Policy for authenticated users to create their own posts
CREATE POLICY "Authenticated users can create their own posts." ON public.posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Policy for authenticated users to update their own posts
CREATE POLICY "Authenticated users can update their own posts." ON public.posts
  FOR UPDATE USING (auth.uid() = author_id);

-- Policy for authenticated users to delete their own posts
CREATE POLICY "Authenticated users can delete their own posts." ON public.posts
  FOR DELETE USING (auth.uid() = author_id);

-- Create the 'profiles' table to store user metadata
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  updated_at TIMESTAMP WITH TIME ZONE,
  username TEXT UNIQUE,
  avatar_url TEXT,
  website TEXT,

  CONSTRAINT "username_length" CHECK (char_length(username) >= 3)
);

-- Enable Row Level Security (RLS) for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy for public profiles to be viewable
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
  FOR SELECT USING (TRUE);

-- Policy for authenticated users to create their own profiles
CREATE POLICY "Authenticated users can create their own profiles." ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Policy for authenticated users to update their own profiles
CREATE POLICY "Authenticated users can update their own profiles." ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create a function to create a new profile when a new user signs up
CREATE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, NEW.email); -- Or use a generated username, etc.
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
