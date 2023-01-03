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
		<hr>
		<h3>Basic Player Information</h3>
		<DataTable table$aria-label="Basic Player Information" style="width: 100%;">
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
		  {/if}
		  <h3>Player Inventory Graphic</h3>
		  <canvas
			bind:this={canvas}
			width={600}
			height={450}
		></canvas>
		  {#if mergedSave.save}
		  <hr>
		  <h3>Player Inventory Table</h3>
		  <DataTable table$aria-label="Inventory" style="width: 100%;">
			<Head>
			  <Row>
				<Cell>ID</Cell>
				<Cell numeric>Qty</Cell>
				<Cell>Image</Cell>
				<Cell>Name</Cell>
			  </Row>
			</Head>
			<Body>
				{#each mergedSave.save.Inventory as item}
				<Row>
					<Cell>{item.id}</Cell>
					<Cell numeric>{item.qty}</Cell>
					<Cell><img src="https://raw.githubusercontent.com/Zakov-Tools/zakov-tools.github.io/main/static/img/{padNumber(data.items[item.id].legacy - 1)}.png" alt="item"/></Cell>
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
	let canvas;
	let mergedSave = {};

	onMount(() => {
		console.log("test canvas", canvas)
		if (browser) {
			mergedSave = JSON.parse(localStorage.getItem("jsSave"));
			//draw the inventory image
			//if (canvas.getContext) {
				const ctx = canvas.getContext("2d");
				ctx.scale(1.5, 1.5);
				for (const item of mergedSave.save.Inventory) {
					//ctx.fillRect(item.x, item.y, 16, 16);
					const img = new Image();
					img.src = `https://raw.githubusercontent.com/Zakov-Tools/zakov-tools.github.io/main/static/img/${padNumber(data.items[item.id].legacy - 1)}.png`;
					img.onload = () => {
						ctx.drawImage(img, item.x, item.y, img.width / 5.375, img.height / 5.375);
						console.log(`drawing ${padNumber(data.items[item.id].legacy - 1)}.png at ${item.x}, ${item.y} (${img.width / 5.375}, ${img.height / 5.375})`);
					}
				}
			//}
		}	
		console.log("modify page load, merged save:")
		console.log(mergedSave)
	});

	function padNumber(number) {
		number = number.toString();
		while(number.length < 4) {
			number = "0" + number;
		}
		return number;
	}
	
</script>

<style>
	canvas {
		padding-left: 0;
		padding-right: 0;
		margin-left: auto;
		margin-right: auto;
		display: block;
	}
</style>