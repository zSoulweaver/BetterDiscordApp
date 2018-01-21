<template>
	<div class='bd-content bd-content-column'>
		<slot />
	</div>
</template>
<script>
export default {
}
</script>
<style lang="scss">
	.bd-content-column {
	  //position: relative;
	  height: 100%;
	  -webkit-box-flex: 1;
	  flex: 1 1 auto;
	}

	.bd-content-column > div {
	  position: absolute;
	  height: 100%;
	  width: 100%;
	}

	.bd-content-column .bd-settingsWrap {
	  flex-direction: column;
	}
	.bd-content-column .bd-settingsWrap .bd-scroller {
	  display: flex;
	  flex-direction: column;
	  contain: layout;
	  overflow-x: hidden;
	  overflow-y: scroll;
	  z-index: 200;
	  width: auto;
	  margin-right: 15px;
	  margin-bottom: 0px;
	}
	::-webkit-scrollbar {
	  -moz-appearance: scrollbartrack-vertical;
	  background-color: rgba(0,0,0,0.1);
	  width: 8px;

	}
	::-webkit-scrollbar-thumb {
	  background-color: rgba(0,0,0,0.6);
	  border-radius: 16px;
	}
</style>