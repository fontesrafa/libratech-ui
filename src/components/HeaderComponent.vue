<template>
    <div class="header">
        <BackButton />
        <LogoutButton />
    </div>
</template>

<script>
import LogoutButton from './LogoutButton.vue';
import BackButton from './BackButton.vue';

export default {
    name: 'HeaderComponent',
    components: {
        LogoutButton,
        BackButton
    }
};
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    background-color: transparent;
}
</style>