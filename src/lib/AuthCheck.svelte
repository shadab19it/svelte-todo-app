<script lang="ts">
	import { user } from '$lib/stores';
</script>

{#if $user}
	<slot />
{:else}
	<p class="text-error my-10">
		You must be signed in to view this page.
		<a href="/login" class="btn btn-primary">Sign in</a>
	</p>
{/if}
