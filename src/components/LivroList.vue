<template>
  <div class="content">
    <LogoComponent/>
    <BarraPesquisa :query="query" :pesquisar="fetchLivros" />
    <div v-if="livros.length === 0">Nenhum livro encontrado</div>
    <LivroItem v-for="livro in livros" :key="livro.id" :id="livro.id" :titulo="livro.titulo"
      :quantidade="livro.quantidade" :autores="livro.autores" :categorias="livro.categorias" :descricao="livro.descricao"
      :assunto="livro.assunto" :editora="livro.editora" :edicoes="livro.edicoes" :imagemURL="livro.imagemURL" 
      :exemplares="livro.exemplares"/>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
      <span>Página {{ currentPage }}</span>
      <button @click="nextPage" :disabled="!hasMorePages">Próxima</button>
    </div>
  </div>
</template>

<script>
import LivroModel from "@/models/LivroModel";
import LivroListItem from "@/components/LivroListItem.vue";
import BarraPesquisa from "@/components/BarraPesquisa.vue";
import LogoComponent from "./LogoComponent.vue";

export default {
  components: {
    LivroItem: LivroListItem,
    BarraPesquisa,
    LogoComponent
  },
  props: {
    query: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      livros: [],
      currentPage: 1,
      itemsPerPage: 10,
      hasMorePages: true
    };
  },
  computed: {
    primeiroLivro() {
      return this.livros[0];
    }
  },
  methods: {
    async fetchLivros() {
      try {
        const response = await new LivroModel().search(this.query, this.currentPage, this.itemsPerPage);
        console.log(response);
        if(response.status === 404 && this.currentPage == 1) {
          console.log('Nenhum livro encontrado');
          alert('Nenhum livro encontrado');
        }
        this.livros = response.data;
        this.hasMorePages = response.data.length === this.itemsPerPage;
        console.log('Livros carregados:', this.livros);
      } catch (error) {
        console.error(error);
      }
    },
    nextPage() {
      if (this.hasMorePages) {
        this.currentPage++;
        this.fetchLivros();
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchLivros();
      }
    }
  },
  async mounted() {
    this.fetchLivros();
  }
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.livro-item {
  width: 95%;
  margin: 5px;
}
.pagination {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
}
.logo {
    margin-bottom: 10px;
    width: 200px;
    height: 40px;
}
</style>