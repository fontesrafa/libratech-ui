<template>
  <div class="livro-detalhes-container">
    <button class="back-button" @click="goBack">🡠</button>
    <div class="content" v-if="livro">
      <div class="container-livro-detalhes">
        <div class="livro-imagem-box">
          <img class="livro-imagem" :src="livro.imagemURL || 'default-image-url.jpg'" alt="ImagemLivro">
        </div>
        <div class="livro-dados">
          <div class="livro-titulo-div">
            <h1 class="livro-titulo-principal">{{ livro.titulo }}</h1>
          </div>
          <div class="livro-autores-div">
            <div class="livro-autor" v-for="autor in livro.autores" :key="autor.id">
              {{ autor.nome }}
              <span v-if="!$last">&nbsp;</span>
            </div>
          </div>
          <h1>{{ livro.editora }}</h1>
          <div class="categorias-div">
            <div>Categoria(s):</div>
            <div v-for="categoria in livro.categorias" :key="categoria.id">
              {{ categoria.nome }}
              <span>&nbsp;</span>
            </div>
          </div>
        </div>
        <div class="container-buttons">
          <div class="info-disponibilidade">
            <h1>Exemplares: {{ livro.quantidade }}</h1>
            <h1>Disponiveis: {{ disponiveis }}</h1>
          </div>
        </div>
      </div>
      <div class="nav-bar">
        <button class="nav-button" :class="{ 'button-selected': conteudoAtual === 'descricao' }"
          @click="conteudoAtual = 'descricao'">Descrição</button>
        <button class="nav-button" :class="{ 'button-selected': conteudoAtual === 'exemplares' }"
          @click="conteudoAtual = 'exemplares'">Exemplares</button>
        <button class="nav-button" :class="{ 'button-selected': conteudoAtual === 'edicoes' }"
          @click="conteudoAtual = 'edicoes'">Edições</button>
        <button class="nav-button" :class="{ 'button-selected': conteudoAtual === 'similares' }"
          @click="conteudoAtual = 'similares'">Similares</button>
      </div>
      <div v-if="conteudoAtual === 'descricao'" class="livro-descricao">
        <h1>{{ livro.descricao }}</h1>
      </div>
      <ExemplarList v-if="conteudoAtual === 'exemplares'" :livroId="livro.id" @exemplares-atualizados="atualizarDisponiveis" />

    </div>
    <div v-else>
      <p>Carregando dados do livro...</p>
    </div>
  </div>
</template>

<script>
import LivroModel from "@/models/LivroModel";
import ExemplarList from "@/components/ExemplarList.vue";
import ExemplarModel from "@/models/ExemplarModel";

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      livro: null,
      conteudoAtual: 'descricao',
      disponiveis: 0
    };
  },
  async created() {
    await this.obterLivroPorId(this.id);
    await this.searchByLivroId(this.id);
     this.atualizarDisponiveis();
  },
  methods: {
    async obterLivroPorId(id) {
      try {
        const response = await new LivroModel().find(id);
        this.livro = response.data;
      } catch (error) {
        console.error("Erro ao obter livro por ID:", error);
      }
    },
    async searchByLivroId(id) {
      try {
        const response = await new ExemplarModel().searchByLivroId(id);
        this.livro.exemplares = response.data;
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
    goBack() {
      this.$router.go(-1);
    },
  },
  computed: {
    quantidadeDisponiveis() {
      if (this.livro && this.livro.exemplares) {
        return this.livro.exemplares.filter(exemplar => 
          !exemplar.reservas.some(reserva => reserva.statusDescricao === "EM_ABERTO") &&
          !exemplar.emprestimos.some(emprestimo => emprestimo.statusDescricao === "EM_ANDAMENTO")
        ).length;
      }
      return 0;
    }
  },
  components: {
    ExemplarList
  }
};
</script>

<style scoped>
.livro-detalhes-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(45, 147, 255, 0.1);
}
.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: black;
  width: 100%;
  height: 100%;
}

.livro-imagem {
  width: 150px;
  height: auto;
  margin: 10px;
}

h1 {
  margin: 5px 0;
  font-size: 16px;
  font-weight: normal;
}

.livro-item {
  width: 100%;
  margin-bottom: 10px;
  background-color: rgb(169, 255, 255);
  width: 300px;
  font-weight: bold;
  text-decoration: none;
}

.livro-dados {
  display: flex;
  flex-direction: column;
  align-items: start;
  flex-grow: 1;
}

.container-livro-detalhes {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.container-buttons {
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-right: 10px;
}

.buttons {
  display: flex;
  flex-direction: column;
}

.grid-button {
  width: 100px;
  height: 30px;
  background-color: #2D93FF;
  color: white;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  border-radius: 10px;
  font-weight: 600;
  text-align: center;
  padding: auto;
  margin: 5px;
  box-shadow: none;
  border: none
}

.info-disponibilidade {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;
  margin-bottom: 10px;
}


.livro-descricao {
  font-family: 'Helvetica', sans-serif;
  text-align: justify;
  display: flex;
  padding: 40px;
}

.nav-bar {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  flex-basis: auto;
  height: 50px
}

.nav-button {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  border: none;
  width: 100%;
  color: #2D93FF;
  background-color: transparent;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  border-left: none;
  border-right: none;
  box-shadow: none;
}

.nav-bar :hover {
  background-color: #2D93FF;
  color: #FFF;
}

.livro-titulo-principal {
  font-family: 'Helvetica', sans-serif;
  font-weight: bold;
  color: black;
  font-size: 20px;
}

.categorias-div {
  display: flex;
  flex-direction: row;
}

.livro-autores-div {
  display: flex;
  flex-direction: row;
}

.button-selected {
  background-color: #007bff;
  color: white;
}

.back-button {
  position: absolute;
  top: 0;
  left: 0;
  margin: 10px;
  width: 30px;
  height: 30px;
  background-color: #2D93FF;
  color: white;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  border-radius: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
