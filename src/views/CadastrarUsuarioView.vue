<template>
    <button class="back-button" @click="goBack">🡠</button>
    <div class="container">
        <LogoComponent/>
        <h1>Cadastro de Usuário</h1>
        <form @submit.prevent="register" class="form-container">
            <div class="input-container">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="user.email" required class="input-field">
            </div>
            <div class="input-container">
                <label for="password">Senha:</label>
                <input type="password" id="password" v-model="user.password" required class="input-field">
            </div>
            <button type="submit" class="submit-button">Cadastrar</button>
        </form>
    </div>
</template>
  
<script>
import UsuarioModel from '@/models/UsuarioModel';
import LogoComponent from '@/components/LogoComponent.vue';

export default {
    components: {
        LogoComponent
    },
    name: 'CadastrarUsuarioView',
    data() {
        return {
            user: {
                email: '',
                password: ''
            }
        };
    },
    methods: {
        async register() {

            try {
                const response = await new UsuarioModel().create(this.user);
                if (response.status === 200) {
                    alert('Usuário cadastrado com sucesso!');
                } else {
                    alert('Erro ao cadastrar usuário.');
                }
            } catch (error) {
                alert('Erro ao cadastrar usuário.');
            }
        },
        goBack() {
            this.$router.go(-1);
        }
    }
}
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap');

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.form-container {
    display: flex;
    flex-direction: column;
    width: 490px;
}

.input-container {
    margin-bottom: 20px;
}

.input-field {
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
    cursor: pointer;
    margin: 0 auto;
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