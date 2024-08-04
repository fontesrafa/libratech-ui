<template>
    <img src="@/assets/logo_libratech.png" alt="Logo" class="img-logo" @click="goHome">
</template>

<script >
export default {
    name: 'LogoComponent',
    props: {
    },
    methods: {
        goHome() {
            this.$router.push({ name: 'home' });
        }
    }
}
</script>
<style>
.img-logo {
      margin-bottom: 10px;
      width: 200px;
      height: 40px;
  }
</style>

