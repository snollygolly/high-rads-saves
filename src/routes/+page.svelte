<svelte:head>
	<title>Home</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="paper-container">
	<Paper color="secondary">
		<Title>How to use</Title>
		<Subtitle>Select <b>"Import"</b> on the top navigation to get started. </Subtitle>
		<Content>You'll need access to your save files to be able to use this utility. I'd highly encourage you to make a backup incase you mess something up. This tool is even more early access than the game and will almost definitely mess up your game.</Content>
	  </Paper>

	<Paper variant="unelevated">
	  <Title>About this app</Title>
	  <Subtitle>This app is meant to import, modify, and export saves for the game <a href="https://store.steampowered.com/app/1782120/ZERO_Sievert/">Zero Sievert</a>.</Subtitle>
	  <Content>It's a great game, but after losing significant progress due to a crash <i>(it is early access after all)</i>, I decided to make something to fix it. We'll see how far I get.</Content>
	</Paper>

	<Paper variant="outlined">
	  <Title>How to find your save files</Title>
	  <Content>Enter the path in the folder address bar: C:/Users/%USERPROFILE%/AppData/Local/Zero_Sievert</Content>
	</Paper>
  </div>

<script lang="ts">
	import Paper, { Title, Subtitle, Content } from '@smui/paper';
</script>