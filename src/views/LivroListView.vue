<template>
    <div>
        <livro-list :query="query" />
    </div>
</template>

<script>
import LivroList from "@/components/LivroList.vue"

export default {
    name: 'LivroListView',
    components: {
        LivroList,
    },
    computed: {
        query() {
            return this.$route.query.query;
        }
    }
}
</script>