<template>
    <div class="container">
        <LogoComponent/>
        <div class="content">
            <h1>Editar Autor</h1>
            <form @submit.prevent="atualizarAutor" class="form-container">
                <div class="input-container top-aligned">
                    <label for="nome">Nome: </label>
                    <input type="text" id="nome" v-model="autor.nome" required class="input-field">
                </div>
                <div class="input-container top-aligned">
                    <label for="biografia">Biografia: </label>
                    <textarea id="biografia" v-model="autor.biografia" required class="input-field-bio"></textarea>
                </div>
                <button type="submit" class="submit-button">Salvar</button>
            </form>
        </div>
    </div>
</template>
  
<script>
import AutorModel from '@/models/AutorModel';
import LogoComponent from '@/components/LogoComponent.vue';
export default {
    components: {
        LogoComponent
    },
    name: 'EditarAutorView',
    data() {
        return {
            autor: {
                id: '',
                nome: '',
                biografia: ''
            }            
        };
    },
    created() {
        this.buscarAutor();
    },
    methods: {
        async buscarAutor() {
            try {
                const id = this.$route.params.id;
                const resposta = await new AutorModel().find(id);
                this.autor = resposta.data;
                console.log(this.autor);
            } catch (error) {
                console.error(error);
                alert('Erro ao buscar autor.');
            }
        },
        async atualizarAutor() {
            console.log(this.autor);
            try {
                const id = this.$route.params.id;
                const data = {
                    id: this.autor.id,
                    nome: this.autor.nome,
                    biografia: this.autor.biografia
                }
                console.log(data);
                const resposta = await new AutorModel().update(id, data);
                if (resposta.status === 204) {
                    alert('Autor atualizado com sucesso!');
                    this.goBack();
                } else {
                    alert('Erro ao atualizar autor. Por favor, tente novamente mais tarde.');
                }
            } catch (error) {
                console.error(error);
                alert('Ocorreu um erro durante a atualização. Por favor, tente novamente mais tarde.');
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