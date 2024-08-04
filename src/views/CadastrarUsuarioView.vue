<template>
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
                <input type="password" id="password" v-model="user.password" required class="input-field" :class="{'error': passwordError}" @input="clearPasswordError">
            </div>
            <div class="input-container">
                <label for="confirmPassword">Repetir Senha:</label>
                <input type="password" id="confirmPassword" v-model="confirmPassword" required class="input-field" :class="{'error': passwordError}" @input="clearPasswordError">
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
            },
            confirmPassword: '',
            passwordError: false
        };
    },
    methods: {
        async register() {
            if (this.user.password !== this.confirmPassword) {
                this.passwordError = true;
                alert('As senhas não coincidem.');
                return;
            }
            try {
                const response = await new UsuarioModel().create(this.user);
                if (response.status === 200) {
                    alert('Usuário cadastrado com sucesso!');
                    this.user.email = '';
                    this.user.password = '';
                    this.confirmPassword = '';
                } else {
                    alert('Erro ao cadastrar usuário.');
                }
            } catch (error) {
                alert('Erro ao cadastrar usuário.');
            }
        },
        clearPasswordError() {
            this.passwordError = false;
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
    align-items: center; 
    width: 100%; 
}
.input-container {
    display: flex;
    flex-direction: column;
    align-items: center; 
    width: 100%; 
    margin-bottom: 20px;
}
.input-field {
    width: 100%; 
    max-width: 400px; 
    height: 40px;
    border-radius: 10px;
    border-color: black;
    font-family: 'Open Sans', sans-serif;
}
.input-field.error {
    background-color: #ffcccc;
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