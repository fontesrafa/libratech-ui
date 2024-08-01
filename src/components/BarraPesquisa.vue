<template>
    <div class="content">
        <div class="search-container">
            <input type="text" v-model="queryExe" class="search-bar" placeholder="Buscar livro, autor...">
            <button @click="pesquisar" class="search-button">Pesquisar</button>
        </div>
        
    </div>
</template>

<script>
export default {
    props: {
        query: {
            type: String,
            required: true
        },
        buttonNames: {
            type: Array,
            required: true
        },
        navegarParaCadastro: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            queryExe: ''
        }
    },
    onMounted() {
        this.queryExe = this.query;
    },
    methods: {
        pesquisar() {
            this.$router.push({ name: 'livro-search', query: { query: this.queryExe } }).then(() => {
                this.$router.go(0);
            });
        },
    }
}
</script>
