import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

export default async function handler(req, res) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      return res.status(400).json({ error: 'Supabase URL or Key missing in environment variables' });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Perform a lightweight query to keep Supabase project active
    const { data, error } = await supabase
      .from('profiles')
      .select('count', { count: 'exact', head: true });

    if (error) {
      console.warn("Keep-alive warning:", error.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Supabase project kept alive successfully!',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error("Keep-alive error:", err);
    return res.status(500).json({ error: err.message });
  }
}
