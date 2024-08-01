<template>
    <div class="content">
        <ExemplarListItem
            v-for="exemplar in exemplares"
            :key="exemplar.id"
            :id="exemplar.id"
            :livro="exemplar.livro"
            :estante="exemplar.estante"
            :disponibilidade="exemplar.disponibilidade"
            :situacaoDescricao="exemplar.situacaoDescricao"
            :reservas="exemplar.reservas"
            :statusReserva="exemplar.statusReserva"
            :emprestimos="exemplar.emprestimos"
            :statusEmprestimo="exemplar.statusEmprestimo"
            @action-completed="refreshExemplares"
            @exemplares-atualizados="atualizarDisponiveis" 
        />
    </div>
</template>

<script>
import ExemplarModel from "@/models/ExemplarModel";
import ExemplarListItem from "@/components/ExemplarListItem.vue";

export default {
    components: {
        ExemplarListItem,
    },
    props: {
        livroId: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            exemplares: [],
        };
    },
    computed: {
        primeiroExemplar() {
            return this.exemplares[0];
        },
    },
    methods: {
        async refreshExemplares() {
            try {
                console.log('Refreshing exemplares...');
                const response = await new ExemplarModel().searchByLivroId(this.livroId);
                this.exemplares = response.data;
                console.log('Exemplares recarregados:', this.exemplares);
                this.$emit('exemplares-atualizados');
            } catch (error) {
                console.error('Error refreshing exemplares:', error);
            }
        },
        atualizarDisponiveis() {
            this.$emit('exemplares-atualizados');
            console.log('emitido evento exemplares-atualizados em ExemplarList');
        }
    },
    async mounted() {
        this.refreshExemplares();
    },
};
</script>

<style scoped>
.content {
    display: flex;
    flex-direction: column;
    align-content: start;
    width: 100%;
}
.exemplar-item {
    width: 95%;
    margin: 5px;
}
</style>