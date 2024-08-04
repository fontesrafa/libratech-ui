<template>
    <LogoComponent />
    <div>
        <h1>Gerenciar Autores</h1>
        <GerenciarAutorListItem v-for="autor in autores" 
        :key="autor.id" 
        :id="autor.id" 
        :nome="autor.nome" 
        :biografia="autor.biografia"
        />
    </div>
</template>

<script>
import AutorModel from "@/models/AutorModel.js";
import GerenciarAutorListItem from "@/components/GerenciarAutorListItem.vue";
import LogoComponent from "./LogoComponent.vue";
export default {
    name: 'GerenciarAutorList',
    components: {
        GerenciarAutorListItem,
        LogoComponent
    },
    props: {
        query: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            autores: []
        }
    },
    async created() {
        const autorModel = new AutorModel();
        if (this.query) {
            const response = await autorModel.search(this.query);
            this.autores = response.data;
        } else {
            const response = await autorModel.all();
            this.autores = response.data;
            console.log('Autores:', this.autores);
        }
    }
}
</script>