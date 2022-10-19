<template>
    <div class="toast">
        <div class="toast__icon icon-check">
            <div class="icon-check"></div>
        </div>
        <div class="toast__text">{{text}}</div>
    </div>
</template>

<script>
export default {
    name: 'WorkspaceJsonDToastMessage',
    props: ['text'],
    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style scoped>
@import url('../../css/base/toast.css');
</style>