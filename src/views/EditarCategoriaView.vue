<template>
    <div class="container">
        <div class="content">
            <h1>Editar Categoria</h1>
            <form @submit.prevent="atualizarCategoria" class="form-container">
                <div class="input-container top-aligned">
                    <label for="nome">Nome:</label>
                    <input v-model="categoria.nome" id="nome" required class="input-field" />
                </div>
                <div class="input-container top-aligned">
                    <label for="descricao">Descrição:</label>
                    <textarea v-model="categoria.descricao" id="descricao" required class="input-field-bio"></textarea>
                </div>
                <button type="submit" class="submit-button">Salvar</button>
            </form>
        </div>
    </div>
</template>

<script>
import CategoriaModel from '@/models/CategoriaModel';
export default {
    name: 'EditarCategoriaView',
    data() {
        return {
            categoria: {
                id: '',
                nome: '',
                descricao: ''
            }
        };
    },
    created() {
        this.buscarCategoria();
    },
    methods: {
        async buscarCategoria() {
            try {
                const id = this.$route.params.id;
                const resposta = await new CategoriaModel().find(id);
                this.categoria = resposta.data;
            } catch (error) {
                console.error(error);
                alert('Erro ao buscar categoria.');
            }
        },
        async atualizarCategoria() {
            console.log('Atualizando categoria...');
            try {
                console.log('Teste Categoria:');
                const id = this.$route.params.id;
                const data = {
                    id: this.categoria.id,
                    nome: this.categoria.nome,
                    descricao: this.categoria.descricao
                };
                console.log(data);
                const resposta = await new CategoriaModel().update(id, data);
                console.log(resposta);
                if (resposta.status === 204) {
                    alert('Categoria atualizada com sucesso!');
                    this.goBack();
                } else {
                    alert('Erro ao atualizar Categoria. Por favor, tente novamente mais tarde.');
                }
            } catch (error) {
                console.error(error);
                alert('Ocorreu um error durante a atualização. Por favor, tente novamente mais tarde.');
            }
        },
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap');

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

.input-container {
    margin-bottom: 20px;
}

.input-field {
    width: 490px;
    height: 40px;
    border-radius: 10px;
    border-color: black;
    font-family: 'Open Sans', sans-serif;
}

.input-field-bio {
    width: 490px;
    height: 400px;
    border-radius: 10px;
    border-color: black;
    font-family: 'Open Sans', sans-serif;
}

.submit-button {
    width: 100px;
    height: 40px;
    background-color: #2D93FF;
    color: white;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    border-radius: 10px;
    font-weight: bold;
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