<template>
  <div class="container">
    <img src="@/assets/logo_libratech.png" alt="Logo" class="logo">
    <div class="content">
      <h1>Login</h1>
      <form @submit.prevent="login" class="form-container">
        <div class="input-container">
          <label for="email">Email: </label>
          <input type="email" id="email" v-model="credentials.email" required class="input-field">
        </div>
        <div class="input-container">
          <label for="password">Senha: </label>
          <input type="password" id="password" v-model="credentials.password" required class="input-field">
        </div>
        <button type="submit" class="submit-button">Entrar</button>
      </form>
    </div>
  </div>
</template>
  
<script>
import UsuarioModel from '@/models/UsuarioModel';

export default {
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async login() {
      if (!this.isValidEmail(this.credentials.email)) {
        alert('Por favor, insira um email válido.');
        return;
      }
      try {
        const response = await new UsuarioModel().login(this.credentials);
        const token = response.data.token;
        localStorage.setItem('jwt', token);
        this.$router.push({ name: 'home' });
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          alert('Credenciais inválidas! Por favor, verifique seu email e senha.');
        } else {
          alert('Ocorreu um erro durante o login. Por favor, tente novamente mais tarde.');
        }
      }
    },
    isValidEmail(email) {
      const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      return re.test(email);
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

.logo {
  margin-bottom: 30px;
  width: 500px;
  height: 100px;
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
</style>