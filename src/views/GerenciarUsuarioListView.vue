<template>
    <div class="usuario-list-view">
        <GerenciarUsuarioList @edit="editUsuario" @deleted="removeUsuario" />
    </div>
</template>

<script>
import GerenciarUsuarioList from '@/components/GerenciarUsuarioList.vue';

export default {
    name: 'GerenciarUsuarioListView',
    components: {
        GerenciarUsuarioList
    },
    methods: {
        editUsuario(id) {
            console.log(`Editando usuário com ID: ${id}`);
        },
        removeUsuario(id) {
            console.log(`Removendo usuário com ID: ${id}`);
        }
    }
};
</script>

<style scoped>
.usuario-list-view {
    padding: 20px;
}
</style>