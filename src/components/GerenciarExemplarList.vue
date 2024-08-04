<template>
    <LogoComponent />
    <div>
        <h1>Gerenciar Exemplares</h1>
        <GerenciarExemplarListItem v-for="exemplar in exemplares" :key="exemplar.id" :exemplar="exemplar" @edit="editar"
            @delete="deletar" />
    </div>
</template>

<script>
import ExemplarModel from "@/models/ExemplarModel";
import GerenciarExemplarListItem from "@/components/GerenciarExemplarListItem.vue";
import LogoComponent from "./LogoComponent.vue";

export default {
    name: 'GerenciarExemplarList',
    components: {
        GerenciarExemplarListItem,
        LogoComponent,
    },
    props: {
        livroId: {
            type: Number,
            required: false,
        },
    },
    data() {
        return {
            exemplares: [],
        };
    },
    methods: {
        async refreshExemplares() {
            try {
                console.log('Refreshing exemplares...');
                const exemplarModel = new ExemplarModel();
                let response;
                if (!this.livroId) {
                    response = await exemplarModel.all();
                } else {
                    response = await exemplarModel.searchByLivroId(this.livroId);
                }
                this.exemplares = response.data;
                console.log('Exemplares recarregados:', this.exemplares);
                this.$emit('exemplares-atualizados');
            } catch (error) {
                console.error('Error refreshing exemplares:', error);
            }
        },
        editar(exemplar) {
            // desenvolver
            console.log('Edit exemplar:', exemplar);
        },
        async deletar(exemplar) {
            if (confirm("Tem certeza que deseja deletar este exemplar?")) {
                console.log("Deletando exemplar...");
                try {
                    const response = await new ExemplarModel().delete(exemplar.id);
                    console.log(response);
                    if (response !== null && response.status === 204) {
                        alert("Exemplar deletado com sucesso!");
                        this.$router.go(0);
                    } else if (response !== null && response.status === 404) {
                        alert("Exemplar não encontrado.");
                    } else {
                        alert("Erro ao deletar exemplar. Por favor, verifique dependências ou tente novamente mais tarde.");
                    }
                } catch (error) {
                    console.error("Erro ao deletar exemplar:", error);
                    alert("Erro ao deletar exemplar. Por favor, tente novamente mais tarde.");
                }
            }
            await this.refreshExemplares();
        }
    },
    async mounted() {
        this.refreshExemplares();
    },
};
</script>

<style scoped>
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
</style>