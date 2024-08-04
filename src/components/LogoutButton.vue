<template>
    <button class="logout-button" @click="confirmLogout">
        <img src="@/assets/logoutbutton.png" alt="Logout" class="logout-image" />
    </button>
</template>
<script>
import UsuarioModel from '@/models/UsuarioModel';
export default {
    name: 'LogoutButton',
    methods: {
        confirmLogout() {
            if (confirm('Você tem certeza que deseja sair?')) {
                this.logout();
            }
        },
        async logout() {
            try {
                const token = localStorage.getItem('jwt');
                if (!token) {
                    alert('Usuário não está logado.');
                    return;
                }
                const response = await new UsuarioModel().logout();
                console.log(response);
                if(response.status === 200) {
                    alert('Logout realizado com sucesso.');
                    localStorage.removeItem('jwt');
                    this.$router.push({ name: 'Login' });
                } else {
                    console.log(response);
                    alert('Erro ao realizar logout. Por favor, tente novamente mais tarde.');
                }
            } catch (error) {
                console.error(error);
                alert('Catch: Erro ao realizar logout. Por favor, tente novamente mais tarde.');
            }
        }
    }
};
</script>
<style scoped>
.logout-button {
    background-color: transparent;
    border: none;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
    border-radius: 10px;
    font-family: 'Open Sans', sans-serif;
}
.logout-image {
    width: 30px;
    height: 30px;
    vertical-align: middle;
}
</style>