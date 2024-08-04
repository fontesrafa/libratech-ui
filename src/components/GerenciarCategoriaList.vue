<template>
    <LogoComponent />
    <div>
        <h1>Gerenciar Categorias</h1>
        <GerenciarCategoriaListItem v-for="categoria in categorias" 
        :key="categoria.id" 
        :id="categoria.id" 
        :nome="categoria.nome"
        :descricao="categoria.descricao"
        />
    </div>
</template>

<script>
import CategoriaModel from '@/models/CategoriaModel';
import GerenciarCategoriaListItem from '@/components/GerenciarCategoriaListItem.vue';
import LogoComponent from './LogoComponent.vue';

export default {
    name: 'GerenciarCategoriaList',
    components: {
        GerenciarCategoriaListItem,
        LogoComponent
    },
    props: {
        query: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            categorias: []
        };
    },
    async created() {
        const categoriaModel = new CategoriaModel();
        if (this.query) {
            const response = await categoriaModel.search(this.query);
            this.categorias = response.data;
        } else {
            const response = await categoriaModel.all();
            this.categorias = response.data;
        }
    }
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.top-aligned {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.input-field {
    width: 300px;
    height: 30px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 5px;
}
</style>