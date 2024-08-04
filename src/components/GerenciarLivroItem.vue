<template>
    <div class="livro-item">
        <img class="livro-imagem" :src="typeof imagemURL === 'string' ? imagemURL : 'default-image-url.jpg'"
            alt="Imagem do Livro" />
        <div class="content">
            <div class="titulo-autores-div">
                <div class="titulo-container">{{ titulo }}</div>
                <div class="livro-autores-div">
                    <div class="livro-autor" v-for="autor in autores" :key="autor.id">
                        {{ autor.nome }}
                        <span v-if="!$last">&nbsp;</span>
                    </div>
                </div>
            </div>
            <div class="space">

            </div>
            <div class="categorias-div">
                <div v-for="categoria in categorias" :key="categoria.id">
                    {{ categoria.nome }}
                    <span>&nbsp;</span>
                </div>
            </div>
        </div>
        <div class="exemplares">
            <p>Exemplares: {{ exemplaresAtuais.length }} unidades</p>
            <p>Disponiveis: {{ disponiveis }} unidades</p>
        </div>
        <div class="buttons">
            <button class="grid-button-edit" @click="editarLivro">Editar</button>
            <button class="grid-button-delete" @click="deletar">Deletar</button>
        </div>
    </div>
</template>

<script>
import ExemplarModel from "@/models/ExemplarModel";
import LivroModel from "@/models/LivroModel";

export default {
    name: "GerenciarLivroItem",
    data() {
        return {
            disponiveis: 0,
            exemplaresAtuais: [],
        };
    },
    components: {
    },
    props: {
        id: {
            type: Number,
            required: true,
        },
        titulo: {
            type: String,
            required: true,
        },
        quantidade: {
            type: Number,
            required: false,
        },
        autores: {
            type: Object,
            default: () => { [] },
        },
        categorias: {
            type: Object,
            default: () => { [] },
        },
        descricao: {
            type: String,
            required: false,
        },
        assunto: {
            type: String,
            required: false,
        },
        editora: {
            type: String,
            default: null,
        },
        edicoes: {
            type: Array,
            default: () => [],
        },
        imagemURL: {
            type: String,
            required: false,
        },
        exemplares: {
            type: Object,
            default: () => { [] },
        },
    },
    async created() {
        await this.searchByLivroId(this.id);
        this.atualizarDisponiveis();
    },
    methods: {

        async searchByLivroId(id) {
            try {
                const response = await new ExemplarModel().searchByLivroId(id);
                this.exemplaresAtuais = response.data;
                console.log(response.data);
                // console.log('Exemplares:', this.livro.exemplares);
            } catch (error) {
                console.error("Erro ao obter livro por ID:", error);
            }
        },
        async atualizarDisponiveis() {
            console.log('Atualizando disponiveis...');
            await this.searchByLivroId(this.id);
            this.disponiveis = this.quantidadeDisponiveis;
            console.log('Disponiveis:', this.disponiveis);
        },
        editarLivro() {
            this.$router.push({ name: 'EditarLivro', params: { id: this.id } });
        },
        async deletar() {
        if (confirm("Tem certeza que deseja deletar este livro?")) {
            console.log("Deletando livro...");
            try {
                const response = await new LivroModel().delete(this.id);
                console.log(response);
                if (response !== null && response.status === 204) {
                    alert("Livro deletado com sucesso!");
                    this.$router.go(0);
                } else if (response !== null && response.status === 404) {
                    alert("Livro não encontrado.");
                } else {
                    alert("Erro ao deletar livro. Por favor, verifique dependencias ou tente novamente mais tarde.");
                }
            } catch (error) {
                console.error("Erro ao deletar livro:", error);
                alert("Erro ao deletar livro. Por favor, tente novamente mais tarde.");
            }
        }
    },
    },
    computed: {
        quantidadeDisponiveis() {
            if (this.exemplaresAtuais && this.exemplaresAtuais.length > 0) {
                return this.exemplaresAtuais.filter(exemplar =>
                    !exemplar.reservas.some(reserva => reserva.statusDescricao === "EM_ABERTO") &&
                    !exemplar.emprestimos.some(emprestimo => emprestimo.statusDescricao === "EM_ANDAMENTO")
                ).length;
            }
            return 0;
        }
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
    flex-direction: column;
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