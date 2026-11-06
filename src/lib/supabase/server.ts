import {createClient} from "@supabase/supabase-js";
import {Database} from "@/lib/supabase/database.types";

export function createSupabaseServerClient() {
    const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

    if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
        throw new Error('NEXT_PUBLIC_SUPABASE_URL of SUPABASE_SECRET_KEY ontbreekt. Zet deze in .env.local.');
    }

    return createClient<Database>(SUPABASE_URL, SUPABASE_SECRET_KEY, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
    });
}