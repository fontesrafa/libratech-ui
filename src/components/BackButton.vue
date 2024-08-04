<template>
    <button class="back-button" @click="goBack">
        <img src="@/assets/backbutton.png" alt="Back" class="back-image" />
    </button>
</template>
<script>
export default {
    name: 'BackButton',
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>
<style scoped>
.back-button {
    position: relative;
    background-color: transparent;
    top: 0;
    left: 0;
    border: none;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.back-image {
    width: 30px;
    height: 30px;
    vertical-align: middle;
}
</style>