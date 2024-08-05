<template>
    <div>
        <LogoComponent />
        <h1>Gerenciar Usuários</h1>
        <div v-if="usuarios.length === 0">Nenhum usuário encontrado.</div>
        <div v-else>
            <GerenciarUsuarioListItem
                v-for="usuario in usuarios"
                :key="usuario.id"
                :id="usuario.id"
                :nome="usuario.userName"
                :email="usuario.email"
                :emprestimos="usuario.emprestimos"
                :reservas="usuario.reservas"
            />
        </div>
    </div>
</template>

<script>
import GerenciarUsuarioListItem from './GerenciarUsuarioListItem.vue';
import UsuarioModel from "@/models/UsuarioModel.js";
import LogoComponent from "./LogoComponent.vue";

export default {
    name: "GerenciarUsuarioList",
    components: {
        GerenciarUsuarioListItem,
        LogoComponent,
    },
    data() {
        return {
            usuarios: [],
        };
    },
    async created() {
        try {
            console.log("Buscando usuários...");
            const response = await new UsuarioModel().getAll();
            this.usuarios = response.data;
            console.log("Usuários:", this.usuarios);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
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