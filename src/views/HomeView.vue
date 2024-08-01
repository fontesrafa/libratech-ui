<template>
    <div class="container">
        <LogoComponent />
        <BarraPesquisa :query="query" :pesquisar="pesquisar" :buttonNames="buttonNames"
            :navegarParaCadastro="navegarParaCadastro" />
        <div class="button-grid">
            <button class="grid-button" v-for="(buttonName, index) in buttonNames" :key="index"
                @click="buttonName === 'CADASTRAR' ? navegarParaCadastro() : null">{{ buttonName }}</button>
        </div>
    </div>


</template>

<script>
import BarraPesquisa from '../components/BarraPesquisa.vue'
import LogoComponent from '../components/LogoComponent.vue'
export default {
    name: 'HomeView',
    components: {
        BarraPesquisa,
        LogoComponent
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
        navegarParaCadastro() {
            this.$router.push({ name: 'Cadastrar' });
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