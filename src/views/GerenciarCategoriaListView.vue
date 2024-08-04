<template>
    <div>
        <gerenciar-categoria-list :query="query" />
    </div>
</template>

<script>
import GerenciarCategoriaList from "@/components/GerenciarCategoriaList.vue"

export default {
    name: 'GerenciarCategoriaListView',
    components: {
        GerenciarCategoriaList,
    },
    computed: {
        query() {
            return this.$route.query.query;
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    }
}
</script>

<style>
@import '../assets/styles/backbutton.css';
</style>