<template>
    <div class="content">
        <exemplar-list :LivroId="id" />
    </div>
</template>

<script>
import ExemplarList from "@/components/ExemplarList.vue"

export default {
    name: 'ExemplarListView',
    components: {
        ExemplarList,
    },
    props: {
        id: {
            type: Number,
            required: true,
        },
    }
}
</script>
<style>
@import '../assets/styles/backbutton.css';

.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(45, 147, 255, 0.1);
}
</style>