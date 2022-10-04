<template>
    <header id="header">
        <div class="header__centre">
            <div class="header__title">
                Danh sách tài sản
            </div>
        </div>
        <div class="header__right">
            <div class="header__sub-title">
                Sở tài chính
            </div>
            <div class="header__year">
                <div class="year__title">Năm</div>
                <div class="year__select">2021</div>
                <div class="year__icon-select">
                    <div class="select-icon--up mb-3"
                    @mouseover="upHereIconUp = true" @mouseleave="upHereIconUp = false">
                </div>
                <d-tool-tip v-show="upHereIconUp" class="" text="Tăng"></d-tool-tip>
                    <div class="select-icon--down"
                    @mouseover="upHereIconDown = true" @mouseleave="upHereIconDown = false">
                        <d-tool-tip v-show="upHereIconDown" class="" text="Giảm"></d-tool-tip>
                    </div>
                </div>
            </div>
            <div class="header__combo-icon">
                <div class="icon-size icon-notifi" 
                @mouseover="upHereIconNotifi = true" @mouseleave="upHereIconNotifi = false">
                    <d-tool-tip v-show="upHereIconNotifi" class="mt-16" text="Thông báo"></d-tool-tip>
                </div>
                <div class="icon-size icon-grid"
                @mouseover="upHereIconGrid = true" @mouseleave="upHereIconGrid = false">
                    <d-tool-tip v-show="upHereIconGrid" class="mt-16" text="Lưới"></d-tool-tip>
                </div>
                <div class="icon-size icon-question"
                @mouseover="upHereIconQuestion = true" @mouseleave="upHereIconQuestion = false">
                    <d-tool-tip v-show="upHereIconQuestion" class="mt-16" text="Hỏi đáp"></d-tool-tip>
                </div>
                <div class="icon-box-user">
                    <div class="icon-user"
                    @mouseover="upHereIconUser = true" @mouseleave="upHereIconUser = false">
                    <d-tool-tip v-show="upHereIconUser" class="mt-16" text="Cá nhân"></d-tool-tip>
                    </div>
                    <div class="select-icon--down"
                    @mouseover="upHereIconDownUser = true" @mouseleave="upHereIconDownUser = false">
                    <d-tool-tip v-show="upHereIconDownUser" class="mt-16 ml--44" text="Mở rộng"></d-tool-tip>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>

import DToolTip from '../base/DToolTip.vue';
export default {
    
    name: 'WorkspaceJsonHeader',
    components: {DToolTip},
    data() {
        return {
            upHereIconUp: false,
            upHereIconDown: false,
            upHereIconNotifi: false,
            upHereIconGrid: false,
            upHereIconQuestion: false,
            upHereIconUser: false,
            upHereIconDownUser: false,
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style scoped>
    @import url('../../css/layout/header.css');
    @import url('../../css/base/common.css');
</style>