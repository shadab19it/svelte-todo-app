<script lang="ts">
	import '../../app.css';

	import { goto } from '$app/navigation';
	import supabase from '$lib/db';
	import { user } from '$lib/stores';
	import { onMount } from 'svelte';

	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	let email = '';
	let password = '';
	let isNewRegistration = false;
	let loading = false;

	onMount(() => {
		if ($user?.email) {
			goto('/');
		}
	});

	const signUp = async () => {
		if (!email || !password) return window.alert('Please enter credentials');
		loading = true;
		let { data, error } = await supabase.auth.signUp({
			email: email,
			password: password
		});
		$user = data.user;
		loading = false;
		goto('/');
	};

	const logIn = async () => {
		if (!email || !password) return window.alert('Please enter credentials');
		loading = true;
		let { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password
		});
		$user = data.user;
		loading = false;
		goto('/');
	};
</script>

<section class="h-screen w-screen bg-gray-100 flex justify-start pt-24 flex-col items-center">
	<!-- <nav class="bg-gray-100 h-12 w-screen shadow-md mb-10"></nav> -->
	{#if isNewRegistration}
		<h2 class="text-center text-xl">SignUp</h2>
	{:else}
		<h2 class="text-center text-xl">Login</h2>
	{/if}
	<div class="w-full py-5 px-10">
		<div class="flex w-full flex-col gap-2 mb-5">
			<Label for="email-2">Email</Label>
			<Input
				type="email"
				on:change={(e) => (email = e.currentTarget.value)}
				id="email-2"
				placeholder="Email"
			/>
		</div>

		<div class="flex w-full flex-col gap-1.5 mb-7">
			<Label for="password">Password</Label>
			<Input
				type="password"
				on:change={(e) => (password = e.currentTarget.value)}
				id="password"
				placeholder="Password"
			/>
		</div>

		{#if isNewRegistration}
			<Button class="w-full" on:click={signUp}>
				SignUp
				{#if loading}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				{/if}
			</Button>
			<p
				class="text-gray-600 text-center pt-2 hover:text-gray-300"
				on:click={() => (isNewRegistration = false)}
			>
				Already have an <span>account?</span>
			</p>
		{:else}
			<Button on:click={logIn} class="w-full">
				Login
				{#if loading}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				{/if}
			</Button>
			<p
				class="text-gray-600 text-center pt-2 hover:text-gray-300"
				on:click={() => (isNewRegistration = true)}
			>
				Create a new <span>account?</span>
			</p>
		{/if}
	</div>
</section>
