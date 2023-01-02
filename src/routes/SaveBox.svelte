<div class="drawer-container">
  <Drawer>
    <Content>
      <List>
        <Item
          href="javascript:void(0)"
          on:click={() => {changeSaveBox(0);}}
        >
          <Text>save_#.ini</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => {changeSaveBox(1);}}
        >
          <Text>save_general_#.ini</Text>
        </Item>
        <Item
          href="javascript:void(0)"
		  disabled='{true}'
        >
          <Text>save_hub_#.ini (coming soon)</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          disabled='{true}'
        >
          <Text>save_player_chest_#.ini (coming soon)</Text>
        </Item>
      </List>
    </Content>
  </Drawer>
 
  <AppContent class="app-content">
    <main class="main-content">
      Zero Sievert Save File Importer
      <br />
      <pre class="status">Paste Save File: {eMap[save]}</pre>
	  <div class="margins">
		<Textfield textarea bind:value={saveInis[save]} label="Paste .ini contents here" required >
		</Textfield>
	  </div>
    </main>
  </AppContent>


</div>

<br>
<div class="margins">
<Fab color="primary" on:click={submitSaves} extended>
	<Icon class="material-icons">settings</Icon>
	<Label>Process</Label>
</Fab>
</div>

<Dialog
  bind:open
  aria-labelledby="default-focus-title"
  aria-describedby="default-focus-content"
>
  <Title id="default-focus-title">Warning</Title>
  <DContent id="default-focus-content">
    You must provide all required .ini files for processing to work
  </DContent>
  <Actions>
    <Button
      defaultAction
      use={[InitialFocus]}
    >
      <BLabel>OK</BLabel>
    </Button>
  </Actions>
</Dialog>

<script lang="ts">
	import Textfield from '@smui/textfield';
	import Drawer, { AppContent, Content } from '@smui/drawer';
  	import List, { Item, Text } from '@smui/list';
	import Fab, { Label, Icon } from '@smui/fab';
	import Dialog, { Title, Content as DContent, Actions, InitialFocus } from '@smui/dialog';
  	import Button, { Label as BLabel } from '@smui/button';
	import { saves, step } from './stores.js';
	let saveInis;
	saves.subscribe(value => {
		saveInis = value;
	});
	const eMap = ["save_#.ini", "save_general_#.ini"];
  
	let open = false;
	let save = 0;
	

	function changeSaveBox(e) {
		save = e;
		console.log("hit change save box");
		console.log(e, eMap[e]);
	}

	function submitSaves (e) {
		if (!saveInis[0].length || !saveInis[1].length) {
			open = true;
		}
		saves.set(saveInis);
		// setting step 1 to indicate we've passed import
		step.set(1);
		console.log(saveInis);
		console.log("clicked submitSaves");
	}
</script>

<style>
  /* These classes are only needed because the
    drawer is in a container on the page. */
  .drawer-container {
    position: relative;
    display: flex;
    height: 350px;
    border: 1px solid
      var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
    overflow: hidden;
    z-index: 0;
  }
 
  * :global(.app-content) {
    flex: auto;
    overflow: auto;
    position: relative;
    flex-grow: 1;
  }
 
  .main-content {
    overflow: auto;
    padding: 16px;
    height: 100%;
    box-sizing: border-box;
  }
</style>