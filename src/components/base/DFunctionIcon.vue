<template>
    <div class="function-icon">
        <div class="icon-change mr-10" 
        @mouseover="upHereIconChange = true" 
        @mouseleave="upHereIconChange = false"
        @click="showFormChange"
        >
            <d-tool-tip v-show="upHereIconChange" class="ml--10 mt--10" text="Chỉnh sửa"></d-tool-tip>
        </div>
        <div class="icon-copy" 
        @mouseover="upHereIconCopy = true" 
        @mouseleave="upHereIconCopy = false"
        @click="showFormDuplicate"
        >
            <d-tool-tip v-show="upHereIconCopy" class="ml--20 mt--10" text="Nhân bản"></d-tool-tip>
        </div>
    </div>
</template>

<script>
import DToolTip from './DToolTip.vue';
export default {
    name: 'WorkspaceJsonDFunctionIcon',
    components: {DToolTip},
    data() {
        return {
            upHereIconCopy: false,
            upHereIconChange: false,
        };
    },

    mounted() {
        
    },

    methods: {
        showFormChange() {
            this.$emit('showFormChange');
        },

        showFormDuplicate() {
            this.$emit('showFormDuplicate');
        }
    },
};
</script>

<style scoped>
    @import url('../../css/base/common.css');
    @import url('../../css/base/common.css');
    @import url('../../css/base/table.css');

</style>