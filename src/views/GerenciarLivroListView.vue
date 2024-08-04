<template>
    <div>
        <gerenciar-livro-list :query="query" />
    </div>
</template>

<script>
import GerenciarLivroList from "@/components/GerenciarLivroList.vue"

export default {
    name: 'GerenciarLivroListView',
    components: {
        GerenciarLivroList,
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

</style>