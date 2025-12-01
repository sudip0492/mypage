// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function HomePage() {
  // Permanently redirect the root path to the login page.
  redirect('/login');
}
