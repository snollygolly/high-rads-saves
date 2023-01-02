<svelte:head>
	<title>Modify Saves</title>
	<meta name="description" content="Modify your save files" />
</svelte:head>

<div class="text-column">
	<h1>Save Modification</h1>

	<p>
		Here you will see an overview on the stats and items we are able to modify for your save files. Support for additional features coming soon. When you have finished modifying your save files how you want, click on "Export" in the menu to go to the next step. 
	</p>

	<div>
		{#if mergedSave.save}
		<DataTable table$aria-label="People list" style="max-width: 100%;">
			<Head>
			  <Row>
				<Cell>Property</Cell>
				<Cell>Value</Cell>
			  </Row>
			</Head>
			<Body>
				{#each Object.entries(mergedSave.save.player) as [prop, value]}
				<Row>
					<Cell>{prop}</Cell>
					<Cell>{value}</Cell>
				</Row>
				{/each}
				{#each Object.entries(mergedSave.save.stats) as [prop, value]}
				<Row>
					<Cell>{prop}</Cell>
					<Cell>{value}</Cell>
				</Row>
				{/each}
				<Row>
					<Cell>inv_value</Cell>
					<Cell>{mergedSave.save.inv_value.now}</Cell>
				</Row>
			</Body>
		  </DataTable>
		  {/if}
	</div>
</div>

<script>
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import { browser } from "$app/environment";

	export let data;
	let mergedSave = {};
	if (browser) {
		mergedSave = JSON.parse(localStorage.getItem("jsSave"));
	}	
	console.log("modify page load, merged save:")
	console.log(mergedSave)
</script>