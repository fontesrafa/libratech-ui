<template>
    <div class="exemplar-item">
        <div class="info-item">
            <div class="exemplar-id">
                {{ id }}
            </div>
            <div class="location-indicador">
                <div class="location-icon">
                    <img class="location-icon-img" :src="require('@/assets/location_icon.png')" />
                </div>
                <div class="indicador">
                    {{ estante.indicador }}
                </div>
            </div>

            <div class="situacao">
                {{ situacaoDescricao }}
            </div>
            <div>
                <div class="reserva-status" v-if="reservasEmAberto.length > 0">
                    Reservado
                </div>
                <div class="emprestimo-status" v-if="emprestimoEmAndamento.length > 0">
                    Emprestado
                </div>
                <div class="disponivel-status" v-if="emprestimoEmAndamento.length == 0 && reservasEmAberto.length == 0">
                    Disponivel
                </div>
            </div>
        </div>
        <div class="datas-buttons">
            <div class="datas-emprestimo">
                <div v-if="emprestimoEmAndamento.length > 0">Saída: {{ dataEmprestimoFormatada }}</div>
                <div v-if="emprestimoEmAndamento.length > 0">Prev. Entrega: {{ dataDevolucaoFormatada }}</div>
            </div>

            <div class="buttons">
                <div class="reservar-buttons">
                    <button class="grid-button" v-if="mostrarBotaoReservar"
                        @click="abrirJanela('reservar', 'Deseja reservar este item? \n Digite a matrícula do solicitante:')">Reservar</button>

                    <button class="grid-button" v-if="mostrarBotaoCancelarReserva"
                        @click="abrirJanela('cancelarReserva', 'Deseja cancelar a reserva deste item?')">Canc.
                        Reserva</button>
                    <button class="grid-button-invisible" v-if="mostrarBotaoEmprestar">______________</button>
                </div>

                <div class="emprestar-buttons">
                    <button class="grid-button" v-if="mostrarBotaoEmprestar"
                        @click="abrirJanela('emprestar', 'Deseja emprestar este item? \n Digite a matrícula do solicitante:')">Emprestar</button>
                    <button class="grid-button" v-if="mostrarBotaoDevolver"
                        @click="abrirJanela('devolver', 'Deseja devolver este item?')">Devolver</button>
                    <button class="grid-button" v-if="mostrarBotaoRenovar"
                        @click="abrirJanela('renovar', 'Deseja renovar este item?')">Renovar</button>
                </div>

            </div>
        </div>

        <ConfirmModal :visible="isModalVisible" :message="modalMessage" @confirm="confirmar" @cancel="cancelar"
            @update-matricula="atualizarMatricula" :showMatriculaInput="showMatriculaInput" />
    </div>
</template>

<script>
import ConfirmModal from "@/components/ConfirmModal.vue";
import UsuarioModel from '@/models/UsuarioModel';
import ReservaModel from '@/models/ReservaModel';
import EmprestimoModel from '@/models/EmprestimoModel';
import moment from 'moment';

export default {
    components: {
        ConfirmModal,
    },
    props: {
        id: {
            type: Number,
            required: true,
        },
        livro: {
            type: Object,
            required: true,
        },
        estante: {
            type: Object,
            required: true,
        },
        disponibilidade: {
            type: Boolean,
            required: true,
        },
        situacaoDescricao: {
            type: String,
            required: true,
        },
        reservas: {
            type: Array,
            required: true,
            default: () => [],
        },
        emprestimos: {
            type: Array,
            required: true,
            default: () => [],
        },
        statusReserva: {
            type: String,
            required: true,
        },
        statusEmprestimo: {
            type: String,
            required: true,
        },
        usuario: {
            type: Object,
            required: false,
        },
        exemplaresDisponiveis: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            isModalVisible: false,
            usuarioLocal: null,
            currentAction: null,
            modalMessage: '',
            showMatriculaInput: false,
        };
    },
    computed: {
        reservasEmAberto() {
            return this.reservas.filter(reserva => reserva.statusDescricao === "EM_ABERTO");
        },
        emprestimoEmAndamento() {
            return this.emprestimos.filter(emprestimo => emprestimo.statusDescricao === "EM_ANDAMENTO");
        },
        mostrarBotaoReservar() {
            return this.reservasEmAberto.length == 0 && this.emprestimoEmAndamento.length > 0;
        },
        mostrarBotaoDevolver() {
            return this.emprestimoEmAndamento.length > 0;
        },
        mostrarBotaoCancelarReserva() {
            return this.reservasEmAberto.length > 0;
        },
        mostrarBotaoEmprestar() {
            return this.emprestimoEmAndamento.length == 0;
        },
        mostrarBotaoRenovar() {
            return this.emprestimoEmAndamento.length > 0 && this.reservasEmAberto.length == 0;
        },
        dataEmprestimoFormatada() {
            if (this.emprestimoEmAndamento.length > 0) {
                return moment(this.emprestimoEmAndamento[0].dataEmprestimo).format('DD-MM-YYYY');
            }
            return '';
        },
        dataDevolucaoFormatada() {
            if (this.emprestimoEmAndamento.length > 0) {
                return moment(this.emprestimoEmAndamento[0].dataDevolucao).format('DD-MM-YYYY');
            }
            return '';
        },
    },
    methods: {
        abrirJanela(action, mensagem) {
            this.modalMessage = mensagem;
            this.currentAction = action;
            this.isModalVisible = true;
            this.showMatriculaInput = (action === 'reservar' || action === 'emprestar');
        },
        async confirmar(matricula) {
            this.isModalVisible = false;
            this.matricula = matricula;


            if (this.currentAction === 'reservar') {
                await this.reservarLivro();
                this.$emit('action-completed')
            } else if (this.currentAction === 'cancelarReserva') {
                await this.cancelarReserva();
                this.$emit('action-completed')
            } else if (this.currentAction === 'emprestar') {
                await this.emprestarLivro();
                this.$emit('action-completed')
            } else if (this.currentAction === 'devolver') {
                await this.devolverLivro();
                this.$emit('action-completed')
            } else if (this.currentAction === 'renovar') {
                if (this.reservasEmAberto.length > 0) {
                    alert('Não é possível renovar. Existem reservas em aberto.');
                } else {
                    await this.renovarLivro();
                    this.$emit('action-completed')
                }
            }
            console.log('emitido evento exemplares-atualizados em ExemplarListItem');

            this.$emit('exemplares-atualizados');
            console.log("Ação confirmada:", this.currentAction);
        },
        atualizarMatricula(novaMatricula) {
            this.matricula = novaMatricula;
        },
        async buscarUsuario() {
            try {
                const usuarioModel = new UsuarioModel();
                console.log('Buscando usuario de matricula:', this.usuarioLocal);
                const response = await usuarioModel.getById(this.matricula);
                const userData = response.data;
                this.usuarioLocal = userData;
                console.log('Usuario Local:', this.usuarioLocal);
            } catch (error) {
                console.error('Erro ao buscar usuario:', error);
            }
        },
        async reservarLivro() {
            try {
                const reservaModel = new ReservaModel();
                await this.buscarUsuario();
                if (this.usuarioLocal === null) {
                    console.error('Usuário não preenchido ou não encontrado.');
                    return;
                }

                if (this.emprestimoEmAndamento.length > 0) {
                    const usuarioEmprestimo = this.emprestimoEmAndamento[0].usuarioId;
                    if (usuarioEmprestimo === this.usuarioLocal.id) {
                        alert('O usuário já está com este livro emprestado.');
                        return;
                    }
                }
                const reservaData = {
                    usuarioId: this.usuarioLocal.id,
                    ExemplarId: this.id
                };
                const response = await reservaModel.create(reservaData);
                if (response.status === 201) {
                    alert('Reserva do exemplar realizada com sucesso para o usuário de matrícula: ' + reservaData.usuarioId);
                }
                console.log('Reserva criada:', response.data);
            } catch (error) {
                console.error('Erro ao criar reserva:', error);
            }
        },
        async cancelarReserva() {
            try {
                const reservaModel = new ReservaModel();
                const reservaEmAberto = this.reservasEmAberto[0];
                if (reservaEmAberto) {
                    const response = await reservaModel.cancelar(reservaEmAberto.id);
                    console.log('Reserva cancelada:', response.data);
                    alert('Reserva cancelada com sucesso.');
                } else {
                    console.log('Nenhuma reserva em aberto para cancelar.');
                }
            } catch (error) {
                console.error('Erro ao cancelar reserva:', error);
            }
        },
        async concluirReserva() {
            try {
                const reservaModel = new ReservaModel();
                const reservaEmAberto = this.reservasEmAberto[0];
                if (reservaEmAberto) {
                    const response = await reservaModel.concluir(reservaEmAberto.id);
                    console.log('Reserva concluída:', response.data);
                } else {
                    console.log('Nenhuma reserva em aberto para concluir.');
                }
            } catch (error) {
                console.error('Erro ao concluir reserva:', error);
            }
        }
        ,
        async emprestarLivro() {
            try {
                const emprestimoModel = new EmprestimoModel();
                const usuario = this.matricula;
                await this.buscarUsuario();
                if (this.reservasEmAberto.length > 0) {
                    if (this.usuarioLocal === null) {
                        await this.buscarUsuario();
                    }
                    var usuarioReserva = this.reservasEmAberto[0].usuarioId;
                    console.log('Reservas em aberto:', this.reservasEmAberto);

                    if (usuarioReserva != this.usuarioLocal.id) {
                        console.log('Usuario local diferente do usuario reserva');
                        console.log('Usuário local:', this.usuarioLocal.id);
                        console.log('Usuario Reserva:', usuarioReserva)
                        alert('Você tentou emprestar este livro para o usuário de matrícula: ' + this.usuarioLocal.id +
                            '\nPorém, o livro está reservado para o usuário de matrícula: ' + usuarioReserva);
                        return;
                    } else {
                        console.log('Usuário local igual ao usuário reserva');
                        console.log('Usuário local:', this.usuarioLocal.id);
                        console.log('Usuario Reserva:', usuarioReserva)
                        await this.concluirReserva();
                    }
                }

                const emprestimoData = {
                    usuarioId: usuario,
                    ExemplarId: this.id
                };
                const response = await emprestimoModel.create(emprestimoData);
                console.log('Empréstimo realizado:', response.data);
                alert('Empréstimo realizado com sucesso para o usuário de matrícula: ' + usuario);
            } catch (error) {
                console.error('Erro ao realizar empréstimo:', error);
            }
        },
        async devolverLivro() {
            try {
                const emprestimoModel = new EmprestimoModel();
                const emprestimoEmAndamento = this.emprestimoEmAndamento[0];
                if (emprestimoEmAndamento) {
                    const response = await emprestimoModel.finalizar(emprestimoEmAndamento.id);
                    alert('Devolução realizada. Empréstimo finalizado com sucesso.');
                    console.log('Empréstimo finalizado:', response.data);
                } else {
                    console.log('Nenhum empréstimo em andamento para finalizar.');
                }
            } catch (error) {
                console.error('Erro ao finalizar emprestimo:', error);
            }
        },
        async renovarLivro() {
            const emprestimo = this.emprestimoEmAndamento[0];
            const emprestimoModel = new EmprestimoModel();
            await emprestimoModel.renovar(emprestimo.id);
            alert('Empréstimo renovado com sucesso. Atente à nova data de devolução.');
        },
        cancelar() {
            this.isModalVisible = false;
        },
    },
};
</script>

<style scoped>
.exemplar-item {
    border: 1px solid rgba(45, 147, 255, 0.1);
    padding: 5px;
    border-radius: 10px;
    background-color: #ffffff;/*rgba(45, 147, 255, 0.1);*/
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
}

.info-item {
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: space-around;
    flex-grow: 1;
}

.info-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}

.datas-buttons {
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-right: 10px;
    padding: 5px;
}

.buttons {
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-right: 10px;
    padding: 5px;
}

.reservar-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.emprestar-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.grid-button {
    width: 100px;
    height: 30px;
    background-color: #2d93ff;
    color: white;
    font-family: "Open Sans", sans-serif;
    font-size: 12px;
    border-radius: 10px;
    font-weight: 600;
    text-align: center;
}

.grid-button-invisible {
    width: 100px;
    height: 0px;
    background-color: transparent;
    color: transparent;
    font-family: "Open Sans", sans-serif;
    font-size: 12px;
    font-weight: 600;
    text-align: center;
    visibility: hidden;
}

.exemplar-imagem {
    max-width: 70px;
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

.exemplar-item {
    border: 1px solid #ffffff;
    padding: 5px;
    border-radius: 10px;
}

.emprestimo-status {
    color: #E61610;
}

.reserva-status {
    color: #D68227;
}

.disponivel-status {
    color: #72BB53;
}

.datas-emprestimo {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 5px;
    width: 203px;
    font-size: 14px;
}
</style>