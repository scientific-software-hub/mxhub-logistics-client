<template>
  <div id="app">
    <router-view />
  </div>
</template>


<script>
export default {
	name: 'App'
}
</script>

<style>
.container-fluid {
  padding: 20px;
}

div.solid-border {
  border-style: solid;
  border-width: 1px 1px 1px 1px;
}

div.box {
  cursor: pointer;
}


</style>
