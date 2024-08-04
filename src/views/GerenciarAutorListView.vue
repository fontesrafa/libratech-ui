<template>
    <div>
        <gerenciar-autor-list :query="query" />
    </div>
</template>

<script>
import GerenciarAutorList from "@/components/GerenciarAutorList.vue"

export default {
    name: 'GerenciarAutorListView',
    components: {
        GerenciarAutorList,
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