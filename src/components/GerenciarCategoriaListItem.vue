<template>
    <div class="categoria-item">
        <div class="content">
            <div class="dados">
                <div>
                    {{ id }} - {{ nome }}
                </div>
                <div class="descricao">
                    {{ descricao }}
                </div>
            </div>
            <div class="buttons">
                <button class="grid-button-edit" @click="editar">Editar</button>
                <button class="grid-button-delete" @click="deletar">Deletar</button>
            </div>
        </div>
    </div>
</template>

<script>
import CategoriaModel from "@/models/CategoriaModel.js";
export default {
    name: "GerenciarCategoriaListItem",
    props: {
        id: {
            type: Number,
            required: true,
        },
        nome: {
            type: String,
            required: true,
        },
        descricao: {
            type: String,
            required: true,
        },
    },
    methods: {
        async deletar() {
            if (confirm("Tem certeza que deseja deletar esta categoria?")) {
                console.log("Deletando categoria...");
                try {
                    const response = await new CategoriaModel().delete(this.id);
                    console.log(response);
                    if (response !== null && response.status === 204) {
                        alert("Categoria deletada com sucesso!");
                        this.$router.go(0);
                    } else if (response !== null && response.status === 404) {
                        alert("Categoria não encontrada.");
                    } else {
                        alert("Erro ao deletar Categoria. Por favor, verifique dependencias ou tente novamente mais tarde.");
                    }
                } catch (error) {
                    console.error("Erro ao deletar Categoria:", error);
                    alert("Erro ao deletar categoria. Por favor, tente novamente mais tarde.");
                }
            }
        },
        editar() {
            this.$router.push({ name: 'EditarCategoria', params: { id: this.id } });
        },
    },
};
</script>

<style scoped>
.categoria-item {
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
.info-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}
.dados {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-right: 10px;
    padding: 5px;
    align-items: start;
}
.descricao {
    font-size: 12px;
}
.buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-right: 10px;
    padding: 5px;
}
.grid-button {
    width: 100px;
    height: 30px;
    background-color: #2d93ff;
    color: white;
    font-family: "Open Sans", sans-serif;
    font-size: 12px;
    border-radius: 10px;
    font-weight: 600;
    text-align: center;
}
.grid-button-edit {
    width: 100px;
    height: 30px;
    background-color: #16ce23;
    color: white;
    font-family: "Open Sans", sans-serif;
    font-size: 12px;
    border-radius: 10px;
    font-weight: 600;
    text-align: center;
}
.grid-button-delete {
    width: 100px;
    height: 30px;
    background-color: #ff2d2d;
    color: white;
    font-family: "Open Sans", sans-serif;
    font-size: 12px;
    border-radius: 10px;
    font-weight: 600;
    text-align: center;
}
.content {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: start;
    background-color: transparent;
    flex-direction: row;
}
</style>