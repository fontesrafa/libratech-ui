<template>
    <div>
        <gerenciar-exemplar-list :query="query" />
    </div>
</template>

<script>
import GerenciarExemplarList from "@/components/GerenciarExemplarList.vue"

export default {
    name: 'GerenciarExemplarListView',
    components: {
        GerenciarExemplarList,
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    },
    computed: {
        query() {
            return this.$route.query.query;
        }
    }
}
</script>
<style>
@import '../assets/styles/backbutton.css';

.content-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(45, 147, 255, 0.1);
}
</style>