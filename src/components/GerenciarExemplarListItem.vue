<template>
    <div class="exemplar-list-item">
        <div class="exemplar-details">
            <div class="dados">
                <div>
                    {{ exemplar.id }} - {{ exemplar.livro.titulo }}
                </div>
                <div class="location-indicador">
                    <div class="location-icon">
                        <img class="location-icon-img" :src="require('@/assets/location_icon.png')" />
                    </div>
                    <div class="indicador">
                        {{ exemplar.estante.indicador }}
                    </div>
                </div>
            </div>
            <div class="situacao">
                <p><strong>Situação:</strong> {{ exemplar.situacaoDescricao }}</p>
                <p><strong>Emprestado:</strong> {{ exemplar.emprestimos.length > 0 ? 'Sim' : 'Não' }}</p>
                <p><strong>Reservado:</strong> {{ exemplar.reservas.length > 0 ? 'Sim' : 'Não' }}</p>
            </div>
        </div>
        <div class="exemplar-actions">
            <button @click="editExemplar" class="edit-button">Editar</button>
            <button v-if="!reservadoOuEmprestado" @click="deleteExemplar" class="delete-button">Deletar</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GerenciarExemplarListItem',
    props: {
        exemplar: Object
    },
    computed: {
        reservadoOuEmprestado() {
            return this.exemplar.emprestimos.length > 0 || this.exemplar.reservas.length > 0;
        }
    },
    methods: {
        editExemplar() {
            // this.$emit('edit', this.exemplar);
            alert("Funcionalidade em desenvolvimento");
        },
        async deleteExemplar() {
            if (confirm('Você tem certeza que deseja deletar este exemplar?')) {
                try {
                    await this.$emit('delete', this.exemplar);
                } catch (error) {
                    console.error(error);
                    alert('Erro ao deletar o exemplar. Por favor, tente novamente mais tarde.');
                }
            }
        }
    }
};
</script>

<style scoped>
.dados {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
}
.situacao {
    display: flex;
    justify-content: space-between;
    align-items: start;
    flex-direction: row;
}
.exemplar-list-item {
    border: 1px solid #ffffff;
    padding: 5px;
    border-radius: 10px;
    background-color: #eaf4ff;
    max-width: 3000px;
    width: 100%;
    font-weight: bold;
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    font-family: "Open Sans", sans-serif;
    box-sizing: border-box;
    margin-bottom: 20px;
    flex-direction: row;
}
.exemplar-details {
    flex-grow: 1;
}
.exemplar-actions {
    display: flex;
    gap: 10px;
}
.edit-button,
.delete-button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
.edit-button {
    background-color: #4CAF50;
    color: white;
}
.delete-button {
    background-color: #f44336;
    color: white;
}
.location-icon-img {
    width: 18px;
    height: 15px;
}
.location-indicador {
    display: flex;
    flex-direction: row;
    gap: 5px;
    margin-right: 5px;
    padding: 2px;
}
</style>