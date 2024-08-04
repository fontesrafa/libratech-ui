<template>
    <div class="container">
        <img src="@/assets/logo_libratech.png" alt="Logo" class="logo" @click="goHome">

        <BarraPesquisa :query="query" :pesquisar="pesquisar" :buttonNames="buttonNames"
            :navegarParaCadastro="navegarParaCadastro" />
        <div class="button-grid">
            <button class="grid-button" v-for="(buttonName, index) in buttonNames" :key="index"
                @click="navigate(buttonName)">{{ buttonName }}
            </button>
        </div>
    </div>
</template>
<script>
import BarraPesquisa from '../components/BarraPesquisa.vue'
export default {
    name: 'HomeView',
    components: {
        BarraPesquisa,
    },
    data() {
        return {
            buttonNames: ['EMPRESTAR RESERVAR', 'DEVOLVER', 'RESETAR SENHA', 'DEVOLUÇÕES ATRASADAS', 'CADASTRAR', 'GERENCIAR', 'RELATÓRIOS', 'FINANCEIRO', 'MENSAGENS']
        };
    },
    methods: {
        pesquisar() {
            this.$router.push({ name: 'livro-search', query: { query: this.query } });
        },
        navigate(buttonName) {
            if (buttonName === 'CADASTRAR') {
                this.$router.push({ name: 'Cadastrar' });
            }
            if (buttonName === 'GERENCIAR') {
                this.$router.push({ name: 'Gerenciar' });
            }
            if (buttonName === 'EMPRESTAR RESERVAR') {
                this.$router.push({ name: 'livro-search', query: { query: '' } });
            }
        },
        goHome() {
            this.$router.push({ name: 'home' });
        }
    }
}
</script>
<style scoped>
@import '@/assets/styles/basicstyle.css';
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.button-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 20px;
}
</style>