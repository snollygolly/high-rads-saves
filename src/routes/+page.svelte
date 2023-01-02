<script>
	import SaveBox from './SaveBox.svelte';
	import Fab, { Label, Icon } from '@smui/fab';

	function submitSaves (e) {
		console.log("clicked submitSaves", e);
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		Copy and paste your save files for Zero Sievert into these boxes and we'll work to help you tweak them to your liking
	</h1>

	<SaveBox />
	<br>
	<div class="margins">
		<Fab color="primary" on:click={submitSaves} extended>
		  <Icon class="material-icons">settings</Icon>
		  <Label>Process</Label>
		</Fab>
	  </div>
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
