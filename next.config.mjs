// next.config.mjs
const getSupabaseHostname = (url) => {
  try {
    const { hostname } = new URL(url);
    return hostname;
  } catch (error) {
    console.error("Invalid NEXT_PUBLIC_SUPABASE_URL:", error);
    return "";
  }
};

const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? getSupabaseHostname(process.env.NEXT_PUBLIC_SUPABASE_URL)
  : "";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: supabaseHostname,
        port: "",
        pathname: "/storage/v1/object/public/blog-images/**",
      },
    ],
  },
};

export default nextConfig;

