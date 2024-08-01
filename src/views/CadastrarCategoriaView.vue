<template>
    <button class="back-button" @click="goBack">🡠</button>
    <div class="container">
        <LogoComponent/>
        <div class="content">
            <h1>Cadastro de Categoria</h1>
            <form @submit.prevent="cadastrarCategoria" class="form-container">
                <div class="input-container top-aligned">
                    <label for="nome">Nome: </label>
                    <input type="text" id="nome" v-model="categoria.nome" required class="input-field">
                </div>
                <div class="input-container top-aligned">
                    <label for="descricao">Descrição: </label>
                    <textarea id="descricao" v-model="categoria.descricao" required class="input-field-bio"></textarea>
                </div>
                <button type="submit" class="submit-button">Cadastrar</button>
            </form>
        </div>
    </div>
</template>
  
<script>
import CategoriaModel from '@/models/CategoriaModel';
import LogoComponent from '@/components/LogoComponent.vue';

export default {
    components: {
        LogoComponent
    },
    name: 'CadastrarCategoriaView',
    data() {
        return {
            categoria: {
                nome: '',
                descricao: ''
            }
        };
    },
    methods: {
        async cadastrarCategoria() {
            try {
                await new CategoriaModel().create(this.categoria);
                this.$router.push({ name: 'Cadastrar' });
            } catch (error) {
                console.error(error);
                alert('Ocorreu um erro durante o cadastro. Por favor, tente novamente mais tarde.');
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
.logo {
    margin-bottom: 30px;
    width: 500px;
    height: 100px;
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