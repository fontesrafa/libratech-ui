<template>
    <div class="container">
        <div class="content">
            <h1>Editar Usuário</h1>
            <form @submit.prevent="atualizarUsuario" class="form-container">
                <div class="input-container top-aligned">
                    <label for="username">Nome de Usuário:</label>
                    <input v-model="usuario.username" id="username" required class="input-field" />
                </div>
                <div class="input-container top-aligned">
                    <label for="email">Email:</label>
                    <input v-model="usuario.email" id="email" required class="input-field" />
                </div>
                <button type="submit" class="submit-button">Salvar</button>
            </form>
        </div>
    </div>
</template>

<script>
import UsuarioModel from '@/models/UsuarioModel';
export default {
    name: 'EditarUsuarioView',
    data() {
        return {
            usuario: {
                id: '',
                username: '',
                email: ''
            }
        };
    },
    created() {
        this.buscarUsuario();
    },
    methods: {
        async buscarUsuario() {
            try {
                const id = this.$route.params.id;
                const resposta = await new UsuarioModel().getById(id);
                this.usuario = resposta.data;
            } catch (error) {
                console.error(error);
                alert('Erro ao buscar usuário.');
            }
        },
        async atualizarUsuario() {
            console.log('Atualizando usuário...');
            try {
                const id = this.$route.params.id;
                const data = {
                    id: this.usuario.id,
                    username: this.usuario.username,
                    email: this.usuario.email
                };
                const resposta = await new UsuarioModel().update(id, data);
                if (resposta.status === 204) {
                    alert('Usuário atualizado com sucesso!');
                    this.goBack();
                } else {
                    alert('Erro ao atualizar usuário. Por favor, tente novamente mais tarde.');
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