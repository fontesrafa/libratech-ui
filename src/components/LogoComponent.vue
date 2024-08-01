<template>
    <img src="@/assets/logo_libratech.png" alt="Logo" class="logo" @click="goHome">
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
