```vue
<template>
    <button class="back-button" @click="goBack">🡠</button>
    <div class="container">
        <div class="content">
            <h1>Editar Editora</h1>
            <form @submit.prevent="atualizarEditora" class="form-container">
                <div class="input-container top-aligned">
                    <label for="nome">Nome:</label>
                    <input v-model="editora.nome" id="nome" required class="input-field" />
                </div>
                <div class="input-container top-aligned">
                    <label for="endereco">Endereço:</label>
                    <input v-model="editora.endereco" id="endereco" required class="input-field" />
                </div>
                <div class="input-container top-aligned">
                    <label for="telefone">Telefone:</label>
                    <input v-model="editora.telefone" id="telefone" required class="input-field" />
                </div>
                <button type="submit" class="submit-button">Salvar</button>
            </form>
        </div>
    </div>
</template>

<script>
import EditoraModel from '@/models/EditoraModel.js';

export default {
    name: 'EditarEditoraView',
    data() {
        return {
            editora: {
                id: '',
                nome: '',
                endereco: '',
                telefone: ''
            }
        };
    },
    created() {
        this.buscarEditora();
    },
    methods: {
        async buscarEditora() {
            try {
                const id = this.$route.params.id;
                const resposta = await new EditoraModel().find(id);
                this.editora = resposta.data;
            } catch (error) {
                console.error(error);
                alert('Erro ao buscar editora.');
            }
        },
        async atualizarEditora() {
            try {
                console.log('Atualizando editora...');
                const id = this.$route.params.id;
                const data = {
                    id: this.editora.id,
                    nome: this.editora.nome,
                    endereco: this.editora.endereco,
                    telefone: this.editora.telefone
                };
                console.log(data);
                console.log('Teste Editora:');
                const resposta = await new EditoraModel().update(id, data);
                if (resposta.status === 204) {
                    alert('Editora atualizada com sucesso!');
                    this.goBack();
                } else {
                    alert('Erro ao atualizar editora. Por favor, tente novamente mais tarde.');
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