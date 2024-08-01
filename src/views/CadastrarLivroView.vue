<template>
  <button class="back-button" @click="goBack">🡠</button>
  <div class="container">
    <LogoComponent />
    <h1>Cadastro de Livros</h1>
    <div class="input-container">
      <img :src="imagemURLLivro" alt="Capa Livro" class="livro-imagem" />
    </div>
    <form @submit.prevent="enviarFormulario" class="content">
      <div class="search-container">
        <label for="tituloLivro">Título do Livro:</label>
        <input id="tituloLivro" v-model="tituloLivro" type="text" required class="search-bar" />

        <label for="quantidadeLivro">Exemplares:</label>
        <input id="quantidadeLivro" type="number" v-model="quantidadeLivro" placeholder="Quantidade de exemplares"
          class="search-bar" />

        <label for="quantidadeLivro">Páginas:</label>
        <input id="quantidadeLivro" type="number" v-model="paginas" placeholder="Quantidade de páginas"
          class="search-bar" />

        <label for="descricaoLivro">Descrição do Livro:</label>
        <textarea id="descricaoLivro" v-model="descricaoLivro" placeholder="Descrição do Livro"
          class="text-descricao"></textarea>

        <label for="assuntoLivro">Assunto do Livro:</label>
        <input id="assuntoLivro" type="text" v-model="assuntoLivro" placeholder="Assunto do Livro" class="search-bar" />

        <label for="imagemURLLivro">URL da Imagem do Livro:</label>
        <input id="imagemURLLivro" type="text" v-model="imagemURLLivro" placeholder="URL da Imagem do Livro"
          class="search-bar" />
      </div>

      <div class="search-container">
        <label for="editora">Editora:</label>
        <select v-model="editoraSelecionada" required class="search-bar">
          <option value="">Selecione uma editora</option>
          <option v-for="editora in editoras" :key="editora.id" :value="editora.id">
            {{ editora.nome }}
          </option>
        </select>
      </div>
      <div class="search-container">
        <label for="indicadorEstante">Indicador da Estante:</label>
        <input id="indicadorEstante" type="text" v-model="indicadorEstante" @input="buscarEstantes"
          placeholder="Indicador da Estante" class="search-bar" />
        <div v-if="estantesFiltradas.length > 0" class="dropdown">
          <ul>
            <li v-for="estante in estantesFiltradas" :key="estante.id" @click="selecionarEstante(estante)">
              {{ estante.indicador }}
            </li>
          </ul>
        </div>
      </div>
      <div class="search-container">
        <label for="autor">Autores:</label>
        <div class="select-button">
          <select v-model="autorSelecionado" class="search-bar">
            <option value="">Selecione um autor</option>
            <option v-for="autor in autores" :key="autor.id" :value="autor.id">
              {{ autor.nome }}
            </option>
          </select>
          <button type="button" class="submit-button" @click="adicionarAutor">
            Adicionar Autor
          </button>
        </div>
      </div>
      <h4>Autores selecionados:</h4>
      <ul v-if="autoresSelecionados.length > 0">
        <li v-for="autor in autoresSelecionados" :key="autor.id">
          {{ autor.nome }}
          <button class="remove-button" @click="removerAutor(autor.id)">X</button>
        </li>
      </ul>
      <div class="search-container">
        <label for="categoria">Categorias:</label>
        <div class="select-button">
          <select v-model="categoriaSelecionada" class="search-bar">
            <option value="">Selecione uma categoria</option>
            <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
              {{ categoria.nome }}
            </option>
          </select>
          <button type="button" class="submit-button" @click="adicionarCategoria">
            Adicionar Categoria
          </button>
        </div>
      </div>
      <h4>Categorias selecionadas:</h4>
      <ul v-if="categoriasSelecionadas.length > 0">
        <li v-for="categoria in categoriasSelecionadas" :key="categoria.id">
          {{ categoria.nome }}
          <button class="remove-button" @click="removerCategoria(categoria.id)">X</button>
        </li>
      </ul>
      <button type="submit" class="submit-button" @click="cadastrarLivro">
        Registrar Livro
      </button>
    </form>
  </div>
</template>

<script>
import AutorModel from '@/models/AutorModel';
import EditoraModel from '@/models/EditoraModel';
import CategoriaModel from '@/models/CategoriaModel';
import LivroModel from '@/models/LivroModel';
import EstanteModel from '@/models/EstanteModel';
import LogoComponent from '@/components/LogoComponent.vue';


export default {
  components: {
    LogoComponent
  },
  name: 'CadastrarLivroView',
  data() {
    return {
      autores: [],
      editoras: [],
      tituloLivro: '',
      quantidadeLivro: 1,
      descricaoLivro: '',
      assuntoLivro: '',
      imagemURLLivro: '',
      autoresSelecionados: [],
      editoraSelecionada: '',
      autorSelecionado: '',
      filtroAutor: '',
      filtroEditora: '',
      categorias: [],
      categoriasSelecionadas: [],
      categoriaSelecionada: '',
      filtroCategoria: '',
      paginas: 0,
      bookImageUrl: '',
      indicadorEstante: '',
      estantesFiltradas: [],
      estanteSelecionada: null,
    };
  },
  computed: {
    autoresFiltrados() {
      return this.autores.filter((autor) =>
        autor.nome.toLowerCase().includes(this.filtroAutor.toLowerCase())
      );
    },
    editorasFiltradas() {
      return this.editoras.filter((editora) =>
        editora.nome.toLowerCase().includes(this.filtroEditora.toLowerCase())
      );
    },
    categoriasFiltradas() {
      return this.categorias.filter((categoria) =>
        categoria.nome.toLowerCase().includes(this.filtroCategoria.toLowerCase())
      );
    },
  },
  methods: {
    enviarFormulario() {
      alert(`Livro "${this.tituloLivro}" registrado com sucesso!`);
    },
    async buscarAutores() {
      try {
        const autores = await new AutorModel().all();
        this.autores = autores.data;
      } catch (error) {
        console.error(error);
        alert('Erro ao buscar autores.');
      }
    },
    async buscarEditoras() {
      try {
        const editoras = await new EditoraModel().all();
        this.editoras = editoras.data;
      } catch (error) {
        console.error(error);
        alert('Erro ao buscar editoras.');
      }
    },
    async buscarCategorias() {
      try {
        const categorias = await new CategoriaModel().all();
        this.categorias = categorias.data;
      } catch (error) {
        console.error(error);
        alert('Erro ao buscar categorias.');
      }
    },
    async buscarEstantes() {
      if (this.indicadorEstante.length > 0) {
        try {
          const estantes = await new EstanteModel().findByIndicador(this.indicadorEstante);
          this.estantesFiltradas = estantes.data;
        } catch (error) {
          console.error(error);
          alert('Erro ao buscar estantes.');
        }
      } else {
        this.estantesFiltradas = [];
      }
    },
    selecionarEstante(estante) {
      this.estanteSelecionada = estante;
      this.indicadorEstante = estante.indicador;
      this.estantesFiltradas = [];
    },
    adicionarAutor() {
      const autor = this.autores.find(
        (autor) => autor.id === this.autorSelecionado
      );
      if (autor && !this.autoresSelecionados.some(a => a.id === autor.id)) {
        this.autoresSelecionados.push(autor);
        this.autorSelecionado = '';
      }
    },
    removerAutor(autorId) {
      this.autoresSelecionados = this.autoresSelecionados.filter(
        (autor) => autor.id !== autorId
      );
    },
    adicionarCategoria() {
      const categoria = this.categorias.find(
        (categoria) => categoria.id === this.categoriaSelecionada
      );
      if (categoria && !this.categoriasSelecionadas.some(c => c.id === categoria.id)) {
        this.categoriasSelecionadas.push(categoria);
        this.categoriaSelecionada = '';
      }
    },
    removerCategoria(categoriaId) {
      this.categoriasSelecionadas = this.categoriasSelecionadas.filter(
        (categoria) => categoria.id !== categoriaId
      );
    },
    async cadastrarLivro() {
      if (this.autoresSelecionados.length === 0 || this.categoriasSelecionadas.length === 0) {
        alert('Por favor, selecione pelo menos um autor e uma categoria.');
        return;
      }
      try {
        const data = {
          titulo: this.tituloLivro,
          quantidade: this.quantidadeLivro,
          descricao: this.descricaoLivro,
          assunto: this.assuntoLivro,
          imagemURL: this.imagemURLLivro,
          paginas: this.paginas,
          autoresIds: this.autoresSelecionados.map(a => a.id),
          categoriasIds: this.categoriasSelecionadas.map(c => c.id),
          editoraId: this.editoraSelecionada,
          estanteId: this.estanteSelecionada ? this.estanteSelecionada.id : null,
        };

        console.log('Data:', data);
        await new LivroModel().create(data);
        alert(`Livro "${this.tituloLivro}" registrado com sucesso!`);
        this.resetForm();
      } catch (error) {
        if (error.response) {
          console.error('Erro na resposta do servidor:', error.response.data);
        } else if (error.request) {
          console.error('Nenhuma resposta recebida:', error.request);
        } else {
          console.error('Erro na configuração da solicitação:', error.message);
        }
      }
    },
    resetForm() {
      this.tituloLivro = '';
      this.quantidadeLivro = 1;
      this.descricaoLivro = '';
      this.assuntoLivro = '';
      this.imagemURLLivro = '';
      this.autoresSelecionados = [];
      this.editoraSelecionada = '';
      this.autorSelecionado = '';
      this.categoriasSelecionadas = [];
      this.categoriaSelecionada = '';
      this.paginas = 0;
      this.indicadorEstante = '';
      this.estantesFiltradas = [];
      this.estanteSelecionada = null;
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  async beforeMount() {
    await Promise.all([
      this.buscarAutores(),
      this.buscarEditoras(),
      this.buscarCategorias(),
    ]);
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap');

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  align-items: center;
  position: relative;
}

.select-button {
  display: flex;
  flex-direction: row;
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
  justify-content: space-around;
}

.input-container {
  margin-bottom: 20px;
}

.remove-button {
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
}

.input-field,
.input-field-bio {
  width: 490px;
  height: 40px;
  border-radius: 10px;
  border-color: black;
  font-family: 'Open Sans', sans-serif;
}

.input-field-bio {
  height: 400px;
}

.submit-button {
  width: 100px;
  height: 40px;
  background-color: #2D93FF;
  color: white;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  border-radius: 10px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin-left: 10px;
}

.search-bar {
  flex-grow: 1;
  width: 500px;
  height: 40px;
  border-radius: 10px;
  font-family: 'Open Sans', sans-serif;
  border-color: black;

}

.text-descricao {
  width: 490px;
  height: 150px;
  border-radius: 10px;
  font-family: 'Open Sans', sans-serif;
  border-color: black;
}

select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.arrow-icon {
  margin-left: -25px;
  pointer-events: none;
  font-size: 16px;
}

.arrow-icon:hover {
  color: gray;
}

.logo {
  max-width: 400px;
  height: auto;
  margin-bottom: 20px;
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

.livro-imagem {
  width: 150px;
  height: auto;
  margin: 10px;
}


.dropdown {
  position: absolute;
  top: 100%;
  width: 490px;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  background-color: white;
  z-index: 1000;
  margin-top: 5px;
}

.dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown li {
  padding: 10px;
  cursor: pointer;
}

.dropdown li:hover {
  background-color: #f0f0f0;
}
</style>