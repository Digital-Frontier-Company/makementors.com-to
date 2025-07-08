import { createBrowserClient } from "@supabase/ssr"

/**
 * Returns a Supabase client or `null` when credentials are not present
 * (e.g. in the v0 preview sandbox).  Consumers must handle the `null`
 * case and use a local / mock data fallback.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.warn(
      "[supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY – " +
        "returning null (using local fallback data instead).",
    )
    return null
  }

  return createBrowserClient(url, key)
}
