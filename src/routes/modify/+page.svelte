<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<h1>MODIFY</h1>

	<p>
		This is a <a href="https://kit.svelte.dev">SvelteKit</a> app. You can make your own by typing the
		following into your command line and following the prompts:

		{data.title}

		{data.content}

		{JSON.stringify(saveInis)}
	</p>
</div>

<script>
	import { saves } from '../stores.js';
	let saveInis;
	saves.subscribe(value => {
		saveInis = value;
	});
	export let data;

	console.log(data)
</script>