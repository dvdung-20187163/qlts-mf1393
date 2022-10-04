<template>
    <div id="navbar">
        <div class="navbar__top pt-10">
            <div class="navbar__logo"></div>
            <div class="navbar__name-app" :class="{ explore : activeNav }">MISA QLTS</div>
        </div>

        <!-- Danh sách điều hướng của trang -->
        <div class="navbar-list pt-15">
            <router-link to="" class="navbar-item"
            @mouseover="upHereIconDasshboard = true" @mouseleave="upHereIconDasshboard = false">
                <div class="navbar-icon icon-dasshboard">
                    <d-tool-tip :class="{ 'tooltip-hidden': !activeNav }" class="margin-nav-item" v-show="upHereIconDasshboard" text="Tổng quan"></d-tool-tip>
            </div>
                <div class="navbar-title" :class="{ explore : activeNav }">Tổng quan</div>
            </router-link>
            <router-link to="/" class="navbar-item"
            :class="{ 'focus-nav' : true }"
            @mouseover="upHereIconAsset = true" @mouseleave="upHereIconAsset = false">
                <div class="navbar-icon icon-asset">
                    <d-tool-tip :class="{ 'tooltip-hidden': !activeNav }" class="margin-nav-item" v-show="upHereIconAsset" text="Tài sản"></d-tool-tip>
                </div>
                <div class="navbar-title" :class="{ explore : activeNav }">Tài sản
                    <div class="navbar-title__icon-down"></div>
                </div>
            </router-link>
            <router-link to="" class="navbar-item"  
            @mouseover="upHereIconRoad = true" @mouseleave="upHereIconRoad = false">
                <div class="navbar-icon icon-road">
                    <d-tool-tip :class="{ 'tooltip-hidden': !activeNav }" class="margin-nav-item" v-show="upHereIconRoad" text="Tài sản hạ tầng đường bộ"></d-tool-tip>
                </div>
                <div class="navbar-title" :class="{ explore : activeNav }">Tài sản HT-ĐB
                    <div class="navbar-title__icon-down"></div>
                </div>
            </router-link>
            <router-link to="" class="navbar-item" 
            @mouseover="upHereIconTool = true" @mouseleave="upHereIconTool = false">
                <div class="navbar-icon icon-tool">
                    <d-tool-tip :class="{ 'tooltip-hidden': !activeNav }" class="margin-nav-item" v-show="upHereIconTool" text="Công cụ"></d-tool-tip>
                </div>
                <div class="navbar-title" :class="{ explore : activeNav }">Công cụ dụng cụ
                    <div class="navbar-title__icon-down"></div>
                </div>
            </router-link>
            <router-link to="" class="navbar-item" 
            @mouseover="upHereIconCategory = true" @mouseleave="upHereIconCategory = false">
                <div class="navbar-icon icon-category">
                    <d-tool-tip :class="{ 'tooltip-hidden': !activeNav }" class="margin-nav-item" v-show="upHereIconCategory" text="Danh mục"></d-tool-tip>
                </div>
                <div class="navbar-title" :class="{ explore : activeNav }">Danh mục</div>
            </router-link>
            <router-link to="" class="navbar-item" 
            @mouseover="upHereIconSearch2 = true" @mouseleave="upHereIconSearch2 = false">
                <div class="navbar-icon icon-search2">
                    <d-tool-tip :class="{ 'tooltip-hidden': !activeNav }" class="margin-nav-item" v-show="upHereIconSearch2" text="Tra cứu"></d-tool-tip>
                </div>
                <div class="navbar-title" :class="{ explore : activeNav }">Tra cứu
                    <div class="navbar-title__icon-down"></div>
                </div>
            </router-link>
            <router-link to="" class="navbar-item" 
            @mouseover="upHereIconReport = true" @mouseleave="upHereIconReport = false">
                <div class="navbar-icon icon-report">
                    <d-tool-tip :class="{ 'tooltip-hidden': !activeNav }" class="margin-nav-item" v-show="upHereIconReport" text="Báo cáo"></d-tool-tip>
                </div>
                <div class="navbar-title" :class="{ explore : activeNav }">Báo cáo
                    <div class="navbar-title__icon-down"></div>
                </div>
            </router-link>
        </div>

        <!-- Thu phóng Navbar -->
        <div class="navbar-explore" >
            <div class="navbar-explore--icon icon-left" 
            @click="onToggleNavbar" :class="{ rotate_180 : activeNav }"
            @mouseover="upHereExplore = true" @mouseleave="upHereExplore = false"
            >    
        </div>
        <d-tool-tip v-show="upHereExplore" class="ml-10 mt--10 mr--40" text="Thu phóng"></d-tool-tip>
        </div>
    </div>

</template>

<script>
import DToolTip from '../base/DToolTip.vue';
export default {
name: 'WorkspaceJsonNavbar',
components: {DToolTip},

data() {
    return {
        activeNav: true,
        upHereIconDasshboard: false,
        upHereIconAsset: false,
        upHereIconRoad: false,
        upHereIconTool: false,
        upHereIconCategory: false,
        upHereIconSearch2: false,
        upHereIconReport: false,
        upHereExplore: false,
    };
},

mounted() {
    
},

methods: {
    /**
     * Thu phóng navbar
     * Author: DVDUNG (21/09/2022)
     */
    onToggleNavbar() {
        this.activeNav = !this.activeNav
        console.log(this.activeNav);
    },

},
};
</script>

<style scoped>
@import url('../../css/layout/navbar.css');
@import url('../../css/base/common.css');

.tooltip-hidden {
    display: none;
}

.focus-nav {
    background-color: #1aa4c8;
    opacity: 1;
}

.margin-nav-item {
        margin-top: 55px;
        margin-right: -150px;
}

.mr--40{
    margin-right: -40px;
}

</style>