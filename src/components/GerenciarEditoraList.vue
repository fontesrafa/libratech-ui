<template>
    <div>
        <LogoComponent />
        <h1>Gerenciar Editoras</h1>
        <div v-if="editoras.length === 0">Nenhuma editora encontrada.</div>
        <div v-else>
            <GerenciarEditoraListItem
                v-for="editora in editoras"
                :key="editora.id"
                :id="editora.id"
                :nome="editora.nome"
                :endereco="editora.endereco"
                :telefone="editora.telefone"
            />
        </div>
    </div>
</template>

<script>
import GerenciarEditoraListItem from './GerenciarEditoraListItem.vue';
import EditoraModel from "@/models/EditoraModel.js";
import LogoComponent from "./LogoComponent.vue";

export default {
    name: "GerenciarEditoraList",
    components: {
        GerenciarEditoraListItem,
        LogoComponent,
    },
    data() {
        return {
            editoras: [],
        };
    },
    async created() {
        try {
            console.log("Buscando editoras...");
            const response = await new EditoraModel().all();
            this.editoras = response.data;
            console.log("Editoras:", this.editoras);
        } catch (error) {
            console.error("Erro ao buscar editoras:", error);
        }
    },
};
</script>

<style scoped>
.editora-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
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