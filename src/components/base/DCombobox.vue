<template>
    <div style="position:relative">
        <div id="" class="combobox">
            <div class="combobox-icon icon-filter" ></div>
            <input type="text" class="combobox-text" 
            ref="inputData" 
            :placeholder="this.text"
            @mouseleave="leaveInput">
            <button class="select-icon--down" @click="showData"></button>
        </div>
        <div class="combobox__data" v-show="isShowData" @mouseleave="leaveInput">
            <div class="combobox__item"
            v-for="(data) in dataCombobox" :key="data[keyCombobox]" 
            @click="selectData(data[DataComboboxName], data[keyCombobox])"
            >{{data[DataComboboxName]}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WorkspaceJsonDCombobox',
    
    created() {
        fetch(this.api, {method: "GET"})
        .then(res=>res.json())
        .then(data=> {
            this.dataCombobox = data
            // console.log(this.dataCombobox);
        })
        .catch(res=>{
            console.log(res);
        });
    },
    props: ["id", "api", "text","keyCombobox", "DataComboboxName"],

    data() {
        return {
            dataCombobox: [],
            isShowData: false,
        };
    },

    mounted() {
        
    },

    methods: {
        /**
         * Hiện data lấy từ api
         * Author: DVDUNG (21/09/2022)
         */
        showData() {
            this.isShowData = !this.isShowData;
            console.log(this.isShowData)
        },

        /**
         * Chọn dữ liệu từ api --> đẩy vào input để hiển thị dữ liệu sau đó ẩn data đi
         * Author: DVDUNG (21/09/2022)
         * @param {} selectData 
         */
        selectData(selectData, id) {
            this.$refs.inputData.value = selectData;
            this.$emit('getIdData', id)
            this.isShowData = false;
        },

        /**
         * Khi chuột dời khỏi combobox thì data sẽ ẩn đi
         * Author: DVDUNG (21/09/2022)
         */
        leaveInput() {
            this.isShowData = false;    
        }
    },
};
</script>

<style scoped>
.combobox, .combobox--w100 {
    position: relative;
    height: 36px;
    width: 100%;
    /* border: 1px solid rgb(50, 40, 121); */
    box-sizing: border-box;
    display: flex;
    
}

.combobox-icon {
    position: absolute;
    top: 6px;
    left: 6px;
}

.combobox--w100 {
    width: 100%;
}

.combobox input {
    width: 219px;
    float: left;
    height: 100%;
    border: none;
    outline: none;
    flex: 1;
    border-radius: 2.5px;
    box-sizing: border-box;
    padding-left: 39px;
}

input::placeholder {
    color: #000;
    opacity: 1;
}

.combobox input:focus {
    border-color: #0078d7;
}

.combobox button {
    position: absolute;
    border: none;
    right: 1px;
    top: 1px;
    width: 36px;
    flex-shrink: 1;
    flex-basis: 36px;
    height: 34px;
    outline: none;
    cursor: pointer;
    background: url("../../assets/icon/qlts-icon.svg") no-repeat -50px -323px;
}

.combobox__data {
    position: absolute;
    top: 100%;
    width: 100%;
    box-shadow: 0 3px 6px #000;
    z-index: 1;
    background-color: #fff;
    max-height: 200px;
    overflow-y: auto;
    z-index: 21;
}

.combobox__item {
    height: 36px;
    display: flex;
    align-items: center;
    padding-left: 56px;
    color: #000;
    z-index: 100;
}

.combobox__item:hover {
    background-color: #cccc;
    background-image: url('../../assets/img/check-mark-16.png');
    background-repeat: no-repeat;
    background-position: 16px center;
    background-color: #109160;
    color: #fff;
}

.icon-filter {
    width: 24px;
    height: 24px;
    background: url("../../assets/icon/qlts-icon.svg") no-repeat -240px -65px;
    cursor: pointer;
}
</style>