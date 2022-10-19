<template>
  <div style="position: relative">
    <div id="" class="combobox">
      <!-- <div class="combobox-icon icon-filter" ></div> -->
      <input
        type="text"
        class="combobox-text"
        ref="inputData"
        :class="{errors : isValidate && validateInput(dataShowCombobox)}"
        @blur="leaveInputData(dataShowCombobox)"
        :placeholder="this.text"
        @focus="focusInput"
        v-model="dataShowCombobox"
      /> 
      <button class="select-icon--down" tabindex="-1" @click="showData"></button>
    </div>
    <div class="combobox__data" v-show="isShowData" @mouseleave="leaveInput">
      <button
        class="btn-combobox combobox__item"
        v-for="data in dataCombobox"
        :key="data[keyCombobox]"
        @click="selectData(data)"
      >
        {{ data[DataComboboxCode] }}
      </button>
      <input type="text" class="inputKey" @keydown.tab="rollTab">
    </div>
  </div>
</template>

<script>
  // import Enum from '../../js/enum.js'
export default {
  name: "WorkspaceJsonDCombobox2",
  created() {
    this.dataShowCombobox = this.ModelInput
    this.getApi = this.api
  },
  
  props: [
    "api",
    "text",
    "keyCombobox",
    "DataComboboxCode",
    "ModelInput",
    "isValidate"
  ],

  data() {
    return {
      dataCombobox: [],
      isShowData: false,
      dataShowCombobox: '',
      getApi: '',
    };
  },

  watch: {
    dataShowCombobox() {
      this.callAPI()
    }
  },
  
  computed: {
    
  },

  mounted() {},

  methods: {
    /**
     * APi lọc theo auto complete
     * Author: DVDUNG (5/10/2022)
     */
    callAPI() {
      let getFilter = []
        if (this.dataShowCombobox != null) {
            getFilter.push(`?keyword=${this.dataShowCombobox}`)
        }
      let filter = getFilter.toString()
      let url = this.getApi + `${filter}`
      fetch(url, { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          this.dataCombobox = data;
        })
        .catch((res) => {
          console.log(res);
        });
    },
    /**
     * Hiện data lấy từ api
     * Author: DVDUNG (21/09/2022)
     */
    showData() {
      this.isShowData = !this.isShowData;
      // console.log(this.isShowData)
    },

    /**
     * Chọn dữ liệu từ api --> đẩy vào input để hiển thị dữ liệu sau đó ẩn data đi
     * Author: DVDUNG (21/09/2022)
     * @param {} selectData
     */
    selectData(dataItem) {
      this.isShowData = false;
      this.dataShowCombobox = dataItem[this.DataComboboxCode];
      this.$emit(
        "autoComplete",
        dataItem
      );
      // console.log(this.isShowData)
    },
 
    /**
     * Khi chuột dời khỏi combobox thì data sẽ ẩn đi
     * Author: DVDUNG (21/09/2022)
     */
    leaveInput() {
      this.isShowData = false;    
    },

    /**
     * Khi focus vào input thì hiện data 
     * Author: DVDUNG (5/10/2022)
     */
    focusInput() {
      this.isShowData = true;
    },

    /**
     * Blur ra khỏi input, nếu chưa có dữ liệu thì sẽ thêm border đỏ
     */
    //  leaveInputData(data) {
    //   if (data == null || data == '' ) {
    //             // thêm border màu đỏ
    //             event.currentTarget.classList.add("errors");
    //             // Thêm title thông báo lỗi (tạm thời chưa làm vì chưa cần)
    //         }
    //         else {
    //             event.currentTarget.classList.remove("errors");
                
    //         }
    //  },
    
    /**
     * Thêm border đỏ khi validate
     * Author: DVDUNG (8/10/2022)
     */
     validateInput(data) {
      if (data == null || data == '') {
        return true
      }
     },

    /**
     * Roll tab về ban đầu khi ấn đến lựa chọn cuối
     * Author: DVDUNG (5/10/2022)
     */
    rollTab() {
    this.$refs.inputData.focus()
    }
  },
};
</script>

<style scoped> 
.combobox,
.combobox--w100 {
  position: relative;
  height: 36px;
  width: 100%;
  /* border: 1px solid rgb(50, 40, 121); */
  box-sizing: border-box;
  display: flex;
  border: none;
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
  border: 1px solid #afafaf;
  outline: none;
  flex: 1;
  border-radius: 2.5px;
  box-sizing: border-box;
  padding-left: 10px;
}

.btn-combobox {
  width: 100%;
  border: none;
  /* border-bottom: 1px solid #afafaf; */
  outline: none;
  background: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.btn-combobox:focus {
  background-color: #d1edf4;
}

input::placeholder {
  font-style: italic;
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
  background: url("../../assets/icon/qlts-icon.svg") no-repeat -55px -323px;
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
  padding-left: 20px;
  color: #000;
  z-index: 100;
}

.combobox__item:hover {
  background-color: #d1edf4;
}

.icon-filter {
  width: 24px;
  height: 24px;
  background: url("../../assets/icon/qlts-icon.svg") no-repeat -240px -65px;
  cursor: pointer;
}

.errors {
  border: 1px solid red !important;
}

.inputKey {
  opacity: 0;
  height: 1px;
}
</style>
