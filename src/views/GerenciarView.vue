<template>
    <div class="container">
        <img src="@/assets/logo_libratech.png" alt="Logo" class="logo" @click="goHome">

        <div class="content">
            <div class="button-grid">
                <button class="grid-button" v-for="(buttonName, index) in buttonNames" :key="index"
                    @click="navigate(buttonName)">{{ buttonName }}</button>
            </div>
        </div>
    </div>
</template>
<script>


export default {
    components: {
    },
    name: 'GerenciarView',
    data() {
        return {
            buttonNames: ['AUTOR', 'CATEGORIA', 'LIVRO', 'EDITORA', 'USUARIO', 'ESTANTE','EMPRESTIMOS', 'RESERVAS', 'EXEMPLARES']
        };
    },
    methods: {
        navigate(buttonName) {
            if (buttonName === 'USUARIO') {
                this.$router.push({ name: 'CadastrarUsuario' });
            }
            if (buttonName === 'AUTOR') {
                this.$router.push({ name: 'GerenciarAutorList' });
            }
            if (buttonName === 'CATEGORIA') {
                this.$router.push({ name: 'GerenciarCategoriaList' });
            }
            if (buttonName === 'LIVRO') {
                this.$router.push({ name: 'GerenciarLivroList' });
            }
            if (buttonName === 'EDITORA') {
                this.$router.push({ name: 'GerenciarEditoraList' });
            }
            if (buttonName === 'EMPRESTIMOS') {
                // this.$router.push({ name: 'Emprestimos' });
            }
            if (buttonName === 'RESERVAS') {
                // this.$router.push({ name: 'Reservas' });
            }
            if (buttonName === 'EXEMPLARES') {
                this.$router.push({ name: 'GerenciarExemplarList' });
            }
            if (buttonName === 'ESTANTE') {
                // this.$router.push({ name: 'Estante' });
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
.button-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
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
.grid-button {
    width: 200px;
    height: 150px;
    background-color: #2D93FF;
    color: white;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    border-radius: 20px;
    font-weight: bold;
}
.navigate-button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>