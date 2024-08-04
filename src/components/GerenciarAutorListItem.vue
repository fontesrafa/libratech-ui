<template>
    <div class="livro-item">
        <div class="content">
            <div class="dados">
                <div>
                    {{ id }} - {{ nome }}
                </div>
                <div class="biografia">
                    {{ biografia }}
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
import AutorModel from "@/models/AutorModel.js";

export default {
    name: "GerenciarAutorListItem",
    components: {
    },
    props: {
        id: {
            type: Number,
            required: true,
        },
        nome: {
            type: String,
            required: true,
        },
        biografia: {
            type: String,
            required: true,
        },
    },
    methods: {
        async deletar() {
            if (confirm("Tem certeza que deseja deletar este autor?")) {
                console.log("Deletando autor...");
                try {
                    const response = await new AutorModel().delete(this.id);
                    console.log(response);
                    if (response !== null && response.status === 204) {
                        alert("Autor deletado com sucesso!");
                        this.$router.go(0);
                    } else if (response !== null && response.status === 404) {
                        alert("Autor não encontrado.");
                    } else {
                        alert("Erro ao deletar Autor. Por favor, verifique dependencias ou tente novamente mais tarde.");
                    }
                } catch (error) {
                    console.error("Erro ao deletar Autor:", error);
                    alert("Erro ao deletar autor. Por favor, tente novamente mais tarde.");
                }
            }
        },
        editar() {
            this.$router.push({ name: 'EditarAutor', params: { id: this.id } });
        },
    },
};
</script>

<style scoped>
.livro-item {
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

.biografia {
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

.livro-imagem {
    max-width: 70px;
    max-height: 100px;
    object-fit: cover;
    border-radius: 2px;
    padding: 8px;
}

.content {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: start;
    background-color: transparent;
    flex-direction: row;
}

.titulo-container {
    background-color: transparent;
    font-family: "Open Sans", sans-serif;
    font-size: 14px;
    margin-bottom: none;
    color: black;
}

.categorias {
    display: flex;
    gap: 10px;
    margin-top: 5px;
}

.categoria-link {
    color: #2d93ff;
    text-decoration: none;
    font-size: 14px;
}

.livro-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    flex-grow: 1;
}

.livro-autores-div {
    display: flex;
    flex-direction: row;
    font-size: 10px;
    font-weight: medium;
    color: #8e8e93;
    height: auto;
}

.categorias-div {
    display: flex;
    flex-direction: row;
    color: #006ce5;
    font-size: 10px;
    font-weight: lighter;
}

.titulo-autores-div {
    display: flex;
    flex-direction: column;
    align-content: start;
}

.exemplares {
    display: flex;
    flex-direction: column;
    align-items: self-start;
    justify-content: center;
    font-size: 10px;
    color: black;
}

.space {
    flex-grow: 1;
    height: 60px;
}
</style>