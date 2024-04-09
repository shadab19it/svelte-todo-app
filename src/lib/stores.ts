import { writable } from 'svelte/store';
import supabase from '$lib/db';
import type { User } from '@supabase/supabase-js';

export const user = writable<any>(null, (set) => {
	let userData: any;
	supabase.auth.getUser().then((data) => {
		userData = data.data.user;
	});

	set(userData as User);
	const unsubscribe = supabase.auth.onAuthStateChange((_, session) => {
		session ? set(session.user) : set(null);
	});
	return () => {
		unsubscribe.data.subscription;
	};
});
