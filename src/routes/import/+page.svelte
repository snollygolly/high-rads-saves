<script>
	import SaveBox from '../SaveBox.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		Copy and paste your save files for Zero Sievert into these boxes and we'll work to help you tweak them to your liking
	</h1>

	<p>Select the label on the left that describes the save file you will be pasting. The game supports several save slots, so if you used slot 1 and you want to start by uploading <i>save_#.ini</i>, you would copy the contents of your <i>save_1.ini</i> file and paste it in the box.</p>

	<SaveBox />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

</style>
