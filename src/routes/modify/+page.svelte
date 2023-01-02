<svelte:head>
	<title>Modify Saves</title>
	<meta name="description" content="Modify your save files" />
</svelte:head>

<div class="text-column">
	<h1>Save Modification</h1>

	<h3>This page is read-only for now, export does not work</h3>

	<p>
		Here you will see an overview on the stats and items we are able to modify for your save files. Support for additional features coming soon. When you have finished modifying your save files how you want, click on "Export" in the menu to go to the next step. 
	</p>

	<div>
		{#if mergedSave.save}
		<DataTable table$aria-label="Basic Bio Stats" style="width: 100%;">
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
		  <hr>
		  <canvas height="400" width="400"></canvas>
		  <hr>
		  <DataTable table$aria-label="Inventory" style="width: 100%;" bind:this={testbind}>
			<Head>
			  <Row>
				<Cell>ID</Cell>
				<Cell numeric>Qty</Cell>
				<Cell>Name</Cell>
			  </Row>
			</Head>
			<Body>
				{#each mergedSave.save.Inventory as item}
				<Row>
					<Cell>{item.id}</Cell>
					<Cell numeric>{item.qty}</Cell>
					<Cell>{data.items[item.id].name}</Cell>
				</Row>
				{/each}
			</Body>
		  </DataTable>
		  {/if}
	</div>
</div>

<script>
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import { browser } from "$app/environment";
	import { onMount } from 'svelte';

	export let data;
	let testbind;
	let mergedSave = {};

	onMount(() => {
		const canvas = document.querySelector("canvas");
		console.log("test canvas", canvas)
		console.log("table here?", testbind)
		if (browser) {
			mergedSave = JSON.parse(localStorage.getItem("jsSave"));
			//draw the inventory image
			//if (canvas.getContext) {
				const ctx = canvas.getContext("2d");
				for (const item of mergedSave.save.Inventory) {
					ctx.fillRect(item.x, item.y, 20, 20);
				}
			//}
		}	
		console.log("modify page load, merged save:")
		console.log(mergedSave)
	});
	
</script>