<template>
    <div class="usuario-list-item">
        <div class="content">
            <div class="dados">
                <div>
                    {{ id }} - {{ username }}
                </div>
                <div>
                    {{ email }}
                </div>
                <div>
                    Reservas realizadas: {{ reservas.length }}
                </div>
                <div>
                    Empréstimos realizados: {{ emprestimos.length }}
                </div>
            </div>
            <div class="usuario-actions">
                <button class="edit-button" @click="editar">Editar</button>
                <button class="delete-button" @click="deletar">Deletar</button>
            </div>
        </div>
    </div>
</template>

<script>
// import UsuarioModel from "@/models/UsuarioModel.js";
export default {
    name: "GerenciarUsuarioListItem",
    components: {
    },
    props: {
        id: {
            type: Number,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        emprestimos: {
            type: Array,
            required: true,
        },
        reservas: {
            type: Array,
            required: true,
        },
    },
    methods: {
        async deletar() {
            //Aguardando desenvolvimento no backend
            // if (confirm("Tem certeza que deseja deletar este usuário?")) {
            //     console.log("Deletando usuário :", this.id);
            //     try {
            //         const response = await new UsuarioModel().delete(this.id);
            //         console.log(response);
            //         if (response !== null && response.status === 204) {
            //             alert("Usuário deletado com sucesso!");
            //             this.$router.go(0);
            //         } else if (response !== null && response.status === 404) {
            //             alert("Usuário não encontrado.");
            //         } else {
            //             alert("Erro ao deletar usuário. Por favor, verifique dependências ou tente novamente mais tarde.");
            //         }
            //     } catch (error) {
            //         console.error("Erro ao deletar usuário:", error);
            //         alert("Erro ao deletar usuário. Por favor, tente novamente mais tarde.");
            //     }
            // }
            alert("Funcionalidade em desenvolvimento");
        },
        editar() {
            //Aguardando desenvolvimento no backend aumentando numero de atributos
            // this.$router.push({ name: 'EditarUsuario', params: { id: this.id } });
            alert("Funcionalidade em desenvolvimento");
        },
    },
};
</script>

<style scoped>
.dados {
    display: flex;
    flex-direction: row;
    gap: 10px;
    flex-grow: 1;
    justify-content: space-between;
    margin: 10px;
}
.usuario-list-item {
    border: 1px solid #ffffff;
    padding: 5px;
    border-radius: 10px;
    background-color: #eaf4ff;
    max-width: 3000px;
    width: 100%;
    font-weight: bold;
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    font-family: "Open Sans", sans-serif;
    box-sizing: border-box;
    margin-bottom: 20px;
    flex-direction: row;
}

.usuario-details {
    flex-grow: 1;
}
.usuario-actions {
    display: flex;
    gap: 10px;
}
.edit-button, .delete-button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
.edit-button {
    background-color: #4CAF50;
    color: white;
}
.delete-button {
    background-color: #f44336;
    color: white;
}
.content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    flex-direction: row;
}
</style>