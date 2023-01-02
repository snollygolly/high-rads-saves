<div class="drawer-container">
  <Drawer>
    <Content>
      <List>
        <Item
          href="javascript:void(0)"
          on:click={() => (save = 'save_#.ini')}
        >
          <Text>save_#.ini</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => (save = 'save_general_#.ini')}
        >
          <Text>save_general_#.ini</Text>
        </Item>
        <Item
          href="javascript:void(0)"
		  disabled=true
        >
          <Text>save_hub_#.ini (coming soon)</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          disabled=true
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
      <pre class="status">Paste Save File: {save}</pre>
	  <div class="margins">
		<Textfield textarea bind:value label="Paste .ini contents here">
		</Textfield>
	  </div>
    </main>
  </AppContent>
</div>

<script lang="ts">
	import Textfield from '@smui/textfield';
	import Drawer, { AppContent, Content } from '@smui/drawer';
  	import List, { Item, Text } from '@smui/list';
  
	let save = '';
	let value = '';
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