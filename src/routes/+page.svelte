<script lang="ts">
	import '../app.css';
	import { goto } from '$app/navigation';
	import type { ITodo } from '$lib/interface';

	import supabase from '$lib/db';
	import { user } from '$lib/stores';
	import Todo from '$lib/Todo.svelte';
	import { onMount } from 'svelte';
	import AuthCheck from '$lib/AuthCheck.svelte';
	import { LogOutIcon, Plus, User } from 'lucide-svelte';

	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { fade } from 'svelte/transition';

	let todos: ITodo[] = [];
	let newTask = '';
	let isDialogOpen = false;

	onMount(async () => {
		await getAllTodos();

		if (!$user.email) {
			goto('/login');
		}
	});

	const getAllTodos = async () => {
		try {
			let { data, error } = await supabase.from('todos').select('*');
			todos = data as ITodo[];
		} catch (err) {
			console.log(err);
		}
	};

	const addNewTodo = async () => {
		try {
			const { data, error } = await supabase
				.from('todos')
				.insert([{ task: newTask, user_id: $user?.id }]);
			await getAllTodos();
			newTask = '';
			isDialogOpen = false;
		} catch (err) {
			console.log(err);
		}
	};

	const updateTodo = async (todo: ITodo) => {
		try {
			const { data, error } = await supabase
				.from('todos')
				.update({ task: todo.task, isComplete: todo.isComplete })
				.eq('id', todo.id);

			console.log('dd', data, error);
			await getAllTodos();
		} catch (err) {
			console.log(err);
		}
	};
	const deleteTodo = async (todo: ITodo) => {
		try {
			const { data, error } = await supabase.from('todos').delete().eq('id', todo.id);
			await getAllTodos();
		} catch (err) {
			console.log(err);
		}
	};

	const handleKeyPress = (event: any) => {
		if (event.key === 'Enter' && newTask !== '') {
			addNewTodo();
		}
	};

	const logOut = async () => {
		let { error } = await supabase.auth.signOut();
		$user = null;
		goto('/login');
	};
</script>

<AuthCheck>
	<section class=" relative h-screen w-screen bg-gray-100 flex justify-start flex-col items-center">
		<nav class="bg-gray-100 h-12 w-screen shadow-md px-4 flex justify-between items-center">
			<div class="flex items-center">
				<Button variant="link" on:click={logOut}>
					<LogOutIcon />
				</Button>
				<User class="text-gray-900" /> <span class="text-sm">{$user.email}</span>
			</div>
			<Button variant="ghost" on:click={() => (isDialogOpen = true)}>
				<Plus class="text-gray-900 cursor-pointer" />
			</Button>
		</nav>

		{#each todos as todo (todo.id)}
			<Todo {todo} {updateTodo} {deleteTodo} />
		{:else}
			<p>No todos found</p>
		{/each}

		<Dialog.Root open={isDialogOpen}>
			<Dialog.Content class="sm:max-w-[425px] absolute top-32">
				<Dialog.Header>
					<Dialog.Title>Add Todo</Dialog.Title>
				</Dialog.Header>
				<div class="w-full">
					<div class="flex w-full max-w-md flex-col gap-2 mb-5">
						<Input id="todo" placeholder="New Todo" bind:value={newTask} class="col-span-3" />
					</div>
				</div>
				<Dialog.Footer>
					<Button type="submit" class="w-full" on:click={() => addNewTodo()}>Add Todo</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	</section>
</AuthCheck>
<svelte:window on:keypress={handleKeyPress} />
