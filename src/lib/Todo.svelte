<script lang="ts">
	import { Delete, Trash2 } from 'lucide-svelte';
	import type { ITodo } from './interface';
	import Button from './components/ui/button/button.svelte';
	export let todo: ITodo;
	export let updateTodo: (todo: ITodo) => void; // Assuming this is a function
	export let deleteTodo: (todo: ITodo) => void; // Assuming this is a function
</script>

<div
	class="todos w-full bg-[#fff] p-1 flex border-b-2 border-gray-300"
	class:done={todo.isComplete}
>
	<input
		type="checkbox"
		class="w-1/5"
		checked={todo.isComplete}
		on:change={(e) => {
			todo.isComplete = e.currentTarget.checked;
			updateTodo(todo);
		}}
	/>

	<input
		type="text"
		class="w-3/5 px-1 border-none"
		value={todo.task}
		on:keypress={(e) => {
			if (e.key === 'Enter') {
				updateTodo(todo);
			}
		}}
		on:input={(e) => {
			todo.task = e.currentTarget.value;
		}}
	/>
	<Button variant="link" class="self-end w-1/5" on:click={() => deleteTodo(todo)}>
		<Trash2 class="hover:text-red-600" />
	</Button>
</div>

<style lang="scss">
	.done {
		opacity: 0.5;
	}
	.done input[type='text'] {
		text-decoration: line-through;
	}
</style>
