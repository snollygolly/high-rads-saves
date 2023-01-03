<svelte:head>
	<title>Modify Saves</title>
	<meta name="description" content="Modify your save files" />
</svelte:head>

<div class="text-column">
	<h1>Save Modification</h1>

	<h3 style="text-decoration: underline;">This page is read-only for now, export does not work</h3>

	<p>
		Here you will see an overview on the stats and items we are able to modify for your save files. Support for additional features coming soon. When you have finished modifying your save files how you want, click on "Export" in the menu to go to the next step. 
	</p>

	<div>
		{#if mergedSave.save}
		<hr>
		<h3>Basic Player Information</h3>
		<h4>In Game: {timeInGame}</h4>
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
				<Row>
					<Cell>real_time_played</Cell>
					<Cell>{mergedSave.save_general["Real time played"].seconds} seconds</Cell>
				</Row>
			</Body>
		  </DataTable>
		  <hr>
		  <DataTable table$aria-label="Player Statistics" style="width: 100%;">
			<Head>
			  <Row>
				<Cell>Property</Cell>
				<Cell>Value</Cell>
			  </Row>
			</Head>
			<Body>
				{#each Object.entries(mergedSave.save_general.Statistics.data) as [prop, value]}
				<Row>
					<Cell>{value.name}</Cell>
					<Cell>{value.value}</Cell>
				</Row>
				{/each}
			</Body>
		  </DataTable>
		  <hr>
		  {/if}
		  <h3>Player Inventory Graphic</h3>
		  <canvas
			bind:this={inventoryCanvas}
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
		  {#if mergedSave.save}
		  <hr>
		  <h3>Quest Information</h3>
		  <DataTable table$aria-label="Quests" style="width: 100%;">
			<Head>
			  <Row>
				<Cell>ID</Cell>
				<Cell>Name</Cell>
				<Cell>Giver</Cell>
				<Cell>Status</Cell>
			  </Row>
			</Head>
			<Body>
				{#each mergedSave.save_general.FinishedQuests as item, index}
				{#if item}
				<Row>
					<Cell>{index}</Cell>
					<Cell>{#if data.quests[index]}{data.quests[index].name}{/if}</Cell>
					<Cell>???</Cell>
					<Cell>Completed</Cell>
				</Row>
				{/if}
				{/each}

				{#each questNpcs as npc}
					{#if mergedSave.save_general[npc]}
					{#each mergedSave.save_general[npc].quests as quest}
					<Row>
						<Cell>{quest.quest}</Cell>
						<Cell>{#if data.quests[quest.quest]}{data.quests[quest.quest].name}{/if}</Cell>
						<Cell>{npc}</Cell>
						<Cell>Not Completed</Cell>
					</Row>
					{/each}
					{/if}
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
	let inventoryCanvas;
	let mergedSave = {};

	let questNpcs = [
		"Barman_quest",
		"The Doctor_quest",
		"Conductor_quest",
		"Igor Kuzmin_quest",
		"General Artemovich_quest",
		"Mr. Junk_quest"
	];
	let traderNpcs = [
		"Barman_trader",
		"The Doctor_trader",
		"Joel Emerson_trader",
		"Reynard Shepard_trader",
		"Alexei Andreevich_trader",
		"Mr. Junk_trader"
	];

	let timeInGame;

	onMount(() => {
		if (browser) {
			mergedSave = JSON.parse(localStorage.getItem("jsSave"));
			// US centric date/time format, so sue me
			timeInGame = `day ${parseInt(mergedSave.save_general.Time.Day_now)} at ${parseInt(mergedSave.save_general.Time.Hour)}:${parseInt(mergedSave.save_general.Time.Minutes)}:00 on ${parseInt(mergedSave.save_general.Time.Month)}/${parseInt(mergedSave.save_general.Time.Day)}/${parseInt(mergedSave.save_general.Time.Year)}`
			//draw the inventory image
			//if (canvas.getContext) {
				const ctx = inventoryCanvas.getContext("2d");
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
		console.log("quest name test")
		console.log(data.quests[2].name)
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