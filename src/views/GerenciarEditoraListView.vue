<template>
    <div >
        <gerenciar-editora-list :query="query" />
    </div>
</template>
<script>
import GerenciarEditoraList from '@/components/GerenciarEditoraList.vue';

export default {
    name: 'GerenciarEditoraListView',
    components: {
        GerenciarEditoraList
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