<template>
  <main>
    <HeaderComponent />
    <RouterView />
  </main>
</template>

<script setup>
import HeaderComponent from './components/HeaderComponent.vue';


</script>
components: {
  HeaderComponent
}
  
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #004182;
  margin-top: 0px;
}
</style>