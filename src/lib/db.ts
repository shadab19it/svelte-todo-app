import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsbmt6dmRvc25xdmF0Z29qeWdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1MjI0NjYsImV4cCI6MjAyODA5ODQ2Nn0.FapnrpM0wrF4ThqX6_nf9AUy8xu_nPSkGS6OK8YyyT0'
);

export default supabase;
