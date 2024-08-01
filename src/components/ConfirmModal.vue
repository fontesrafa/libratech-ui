<template>
  <div class="modal-overlay" v-if="visible">
    <div class="modal">
      <p>{{ message }}</p>
      <input v-if="showMatriculaInput" type="text" v-model="matricula" class="input-matricula" @input="updateMatricula"/>
      <br>
      <div>
        <span v-if="usuario">{{ usuario }}</span>
      </div>
      <br>
      <button class="cancel-button" @click="cancel">Cancelar</button>
      <button class="confirm-button" @click="confirm">Confirmar</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    showMatriculaInput: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      matricula: '',
      usuario: null
    };
  },
  methods: {
    updateMatricula() {
      this.$emit('update-matricula', this.matricula);
    },
    confirm() {
      this.$emit('confirm', this.matricula);
    },
    cancel() {
      this.$emit('cancel');
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: #B7D7FC;
  padding: 20px;
  border-radius: 20px;
  text-align: center;
  color: #0844A4;
}
.cancel-button {
  background-color: #E61610;
  color: white;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  border-radius: 10px;
  font-weight: bold;
  margin: 10px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
.confirm-button {
  background-color: #72BB53;
  color: white;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  border-radius: 10px;
  font-weight: bold;
  margin: 10px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
</style>