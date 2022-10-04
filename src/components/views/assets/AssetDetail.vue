<template>
    <div id="modal" class="modal" ref="modal" tabindex="-1"  @keydown="keyDownModal">
        <div class="form-asset" @click.stop>
            <div class="form-asset__header">
                <div class="form-asset__title">
                    {{titleForm}}
                </div>
                <div class="form-asset__icon icon-close"  @click="closeForm"></div>
            </div> 
            <div class="form-asset__body">
                <div class="double-input--1-2">
                    <div class="box-text-field mr-16">
                        <div class="label__text-field">Mã tài sản <span style="color:red">&#8727;</span></div>
                        <input type="text" class="text-field width-100" ref="assetID" 
                        v-model="assetData.fixed_asset_code" 
                        @blur="leaveFocusInput(assetData.fixed_asset_code)"
                        >
                    </div>
                    <div class="box-text-field">
                        <div class="label__text-field">Tên tài sản <span style="color:red">&#8727;</span></div>
                        <input type="text" class="text-field width-100" placeholder="Nhập tên tài sản"
                        v-model="assetData.fixed_asset_name" 
                        @blur="leaveFocusInput(assetData.fixed_asset_name)"
                        >
                    </div>
                </div>
                <div class="double-input--1-2">
                    <!-- combobox -->
                    <div class="box-combobox mr-16">
                        <div class="label__text-field">Mã bộ phận sử dụng <span style="color:red">&#8727;</span>
                        </div>
                        <d-combobox-2 
                        @autoComplete="autoCompleteDepartmentName" 
                        :api="this.urlGetDataDepartment" 
                        text="Chọn mã bộ phận sử dụng"
                        keyCombobox="department_id"
                        DataComboboxCode="department_code"
                        DataComboboxName="department_name"
                        :ModelInput="assetData.department_code"
                        @blur="leaveFocusInput(assetData.department_code)"></d-combobox-2>
                    </div>
                    <div class="box-text-field">
                        <div class="label__text-field">Tên bộ phận sử dụng</div>
                        <input type="text" class="text-field--disable width-100" v-model="assetData.department_name" disabled>
                    </div>
                </div>
                <!-- <div class="combobox width-100 border-none">
                    <input type="text" class="text-field width-100">
                    <div class="combobox__box-selecte form-icon--selecte">
                        <div class="select-icon--up mb-5"></div>
                        <div class="select-icon--down"></div>
                    </div>
                </div> -->
                <div class="double-input--1-2">
                    <!-- combobox -->
                    <div class="box-combobox mr-16">
                        <div class="label__text-field">Mã loại tài sản <span style="color:red">&#8727;</span></div>
                        <d-combobox-2 
                        @autoComplete="autoCompleteAssetCategory" 
                        :api="this.urlGetDataAssetCategory" 
                        text="Chọn mã loại tài sản"
                        keyCombobox="fixed_asset_category_id"
                        DataComboboxCode="fixed_asset_category_code"
                        DataComboboxName="fixed_asset_category_name"
                        DepreciationRate="depreciation_rate"
                        LifeTime="life_time"
                        :ModelInput="assetData.fixed_asset_category_code"
                       ></d-combobox-2>
                    </div>
                    <div class="box-text-field">
                        <div class="label__text-field">Tên loại tài sản</div>
                        <input type="text" class="text-field--disable width-100" v-model="assetData.fixed_asset_category_name" disabled>
                    </div>
                </div>
                <div class="three-input--1-1-1">
                    <div class="box-text-field mr-16">
                        <div class="label__text-field">Số lượng <span style="color:red">&#8727;</span></div>
                        <div class="combobox width-100 border-none">
                            <input type="number" class="text-field width-100 pr-25" ref="quantity" 
                            v-model="assetData.quantity"  
                            @blur="leaveFocusInput(assetData.quantity)">
                            <div class="combobox__box-selecte form-icon--selecte">
                                <button tabindex="-1" class="btn-select select-icon--up mb-4" @click="this.$refs.quantity.stepUp()"></button>
                                <button tabindex="-1" class="btn-select select-icon--down" @click="this.$refs.quantity.stepDown()"></button>
                            </div>
                        </div>
                    </div>
                    <div class="box-text-field mr-16">
                        <div class="label__text-field">Nguyên giá <span style="color:red">&#8727;</span></div>
                        <input type="text"
                        v-model="formatCost"
                        class="text-field width-100" 
                        @blur="leaveFocusInput(assetData.cost)">
                    </div>
                    <div class="box-text-field">
                        <div class="label__text-field">Tỷ lệ hao mòn (%) <span style="color:red">&#8727;</span></div>
                        <div class="combobox width-100 border-none">
                            <input v-model="depreciationRate" 
                            type="text"
                            name="decimal"
                            v-mask-decimal.br="2"
                            ref="depreciationRate" 
                            class="text-field width-100 text-right"
                            @keydown="checkDepreciation"
                            @blur="leaveFocusInput(assetData.depreciation_rate)">
                            <!-- <div class="combobox__box-selecte form-icon--selecte">
                                <button class="btn-select select-icon--up mb-4" @click="this.$refs.depreciationRate.stepUp()"></button>
                                <button class="btn-select select-icon--down" @click="this.$refs.depreciationRate.stepDown()"></button>
                            </div> -->
                        </div>
                    </div>
                </div>
                <div class="three-input--1-1-1">
                    <div class="box-text-field mr-16">
                        <div class="label__text-field">Ngày mua <span style="color:red">&#8727;</span></div>
                        <div class="combobox width-100 border-none">
                            <el-date-picker
                                class="date-picker"
                                v-model="assetData.purchase_date"
                                type="date"
                                format="DD/MM/YYYY"
                                value-format="YYYY-MM-DD"
                                @blur="leaveFocusInput(assetData.purchase_date)"/>
                        </div>
                    </div>
                    <div class="box-text-field mr-16">
                        <div class="label__text-field">Ngày bắt đầu sử dụng <span style="color:red">&#8727;</span></div>
                        <div class="combobox width-100 border-none">
                            <el-date-picker
                                class="date-picker"
                                v-model="assetData.production_date"
                                type="date"
                                format="DD/MM/YYYY"
                                value-format="YYYY-MM-DD"> 
                        </el-date-picker>
                        </div>  
                    </div>
                    <div class="box-text-field">
                        <div class="label__text-field">Năm theo dõi</div>
                        <input type="number" class="text-field--disable width-100" v-model="assetData.tracked_year" disabled>
                    </div>
                </div>
                <div class="three-input--1-1-1 mb-20">
                    <div class="box-text-field mr-16">
                        <div class="label__text-field">Số năm sử dụng <span style="color:red">&#8727;</span></div>
                        <div class="combobox width-100 border-none">
                            <input type="number" class="text-field width-100 pr-25" min="0" ref="liftTime" v-model="assetData.life_time">
                            <div class="combobox__box-selecte form-icon--selecte">
                                <button class="btn-select select-icon--up mb-4" @click="this.$refs.liftTime.stepUp()"></button>
                                <button class="btn-select select-icon--down" @click="this.$refs.liftTime.stepDown()"></button>
                            </div>
                        </div>
                    </div>
                    <div class="box-text-field mr-16">
                        <div class="label__text-field">Giá trị hao mòn năm <span style="color:red">&#8727;</span></div>
                        <input type="text"
                        v-model="depreciationYear" 
                        class="text-field width-100 text-right">
                    </div>
                </div>
            </div>
            <div class="form-asset__footer">
                <button class="btn outline-btn mr-10" @click="showDialog">Hủy</button>
                <button ref="save"  class="btn main-btn" @click="saveData">Lưu</button>
                <button @keyup.tab="focusInputOne" class="btn__tab"></button>
            </div>
        </div>
        
        <!-- Khi dùng component Dialog -->
        <d-dialog 
        v-show="isShowDialogDetail"  
        :title="titleDialogDetail" 
        :titleBtn1="titleBtnDialog1"
        :titleBtn2="titleBtnDialog2"
        :titleBtn3="titleBtnDialog3"
        :activeBtn1="activeBtnDialog1"
        :activeBtn2="activeBtnDialog2">
        </d-dialog>
    </div>
    
</template>

<script>
import DDialog from '@/components/base/DDialog.vue';
import DCombobox2 from '@/components/base/DCombobox2.vue';
import Enum from '../../../js/enum.js'
import Resource from '../../../js/resource.js'
import moment from 'moment'
// import axios from 'axios';
export default {
    name: "WorkspaceJsonAssetDetail",
    data() {
        return {
            // Show dialog ở pop-up thêm tài sản
            isShowDialogDetail: false,
            invalidAssetCode: false,
            invalidAssetName: false,
            activeBtnDialog1: true,
            activeBtnDialog2: true,
            assetData: {},
            // Title
            titleDialogDetail: Resource.TitleDialog.AddAsset.VI,
            titleBtnDialog1: Resource.TitleBtnDialog.NoCancel.VI,
            titleBtnDialog2: '',
            titleBtnDialog3: Resource.TitleBtnDialog.Cancel.VI,
            titleErrValidate: [],
            // url api
            urlGetDataAssetCategory: Resource.API.AssetCategory.GET.AllAssetCategory,
            urlGetDataDepartment: Resource.API.Department.GET.AllDepartment,
            urlBtnSave: Resource.API.Asset.GET.AllAsset,
            methodBtnSave: 'POST',
            maxCodeAsset: '',
            // format value
            
            formatQuantity: '',
            formatDepreciationRate: '',
            formatDepreciationYear: '',
        };
    },
    
    props: {
        assetSelected: Function,
        titleForm: {
            type: String
        },
        formMode: {
            type: Number,
            default: 1
        }
    },

    created() {
        console.log(this.maxCodeAsset)
        this.assetData = this.assetSelected;
        if(this.formMode == Enum.FormMode.Add || this.formMode == Enum.FormMode.Duplicate) {
            this.assetData.tracked_year = this.printYear()
            this.assetData.purchase_date = this.currentDateTime()
            this.assetData.production_date = this.currentDateTime()
            this.callApiGetMaxCode();
        }
        
    },

    mounted() {
        this.$refs.assetID.focus()
    },

    computed: {
        depreciationYear() {
            if (this.assetData.cost != null && this.assetData.depreciation_rate != null) {
                if (this.formMode == Enum.FormMode.Edit)  {
                    let depreciationYear = this.assetData.cost * parseFloat(this.assetData.depreciation_rate*100) /100
                    return this.formatPrice(depreciationYear)
                } else {
                    let depreciationYear = this.assetData.cost * parseFloat(this.assetData.depreciation_rate.replace(',', '.')) /100
                    return this.formatPrice(depreciationYear)
                }
            }
            else return 0
        },

        depreciationRate() {
            return this.formatPrice(this.assetData.depreciation_rate)
        },

        formatCost() {
            let formatCode = this.assetData.cost
            return this.formatPrice(formatCode)
        }
    },

    methods: {
        keyDownModal(e) {
            if(e.keyCode == Enum.KeyCode.ESC) {
                this.showDialog()
            }
        },

        /**
         * Đóng form pop-up
         * Author: DVDUNG (21/09/2022)
         */
        closeForm() {
            this.$emit("closeForm");
        },

        /**
         * Đóng dialog
         * Author: DVDUNG (21/09/2022)
         */
        closeDialog() {
            this.isShowDialogDetail = false;
        },

        /**
         * Chọn hủy bỏ (hủy bỏ tài sản) từ dialog ở pop-up thêm mới tài sản
         * --> Đóng pop-up và dialog
         * Author: DVDUNG (21/09/2022)
         */
        destroys() {
            this.isShowDialogDetail = false;
            // Nếu đang ở form chỉnh sửa tài sản thì sẽ lưu lại dữ liệu
            if(this.formMode == Enum.FormMode.Edit) {
                this.callApiBtnSave();
            }
            if(this.titleErrValidate.length == 0) {
                this.$emit("closeForm");
            }
        },
        
        /**
         * Hiện dialog khi bấm nút hủy ở pop-up
         * Author: DVDUNG (21/09/2022)
         */
        showDialog(){
            // Thiết lập hiện dialog, title dialog, title btn dialog ở form thêm tài sản
            if(this.formMode == Enum.FormMode.Add) {
                this.isShowDialogDetail = true;
                // this.titleBtnDialog1 = Resource.TitleBtnDialog.NoCancel.VI
                // this.titleBtnDialog3 = Resource.TitleBtnDialog.Cancel.VI
                this.activeBtnDialog2 = false
            }

            // Thiết lập hiện dialog, title dialog, title btn dialog ở form chỉnh sửa tài sản
            if(this.formMode == Enum.FormMode.Edit ) {
                this.isShowDialogDetail = true;
                this.titleDialogDetail = Resource.TitleDialog.SaveUpdate.VI
                this.titleBtnDialog1 = Resource.TitleBtnDialog.Cancel.VI
                this.titleBtnDialog2 = Resource.TitleBtnDialog.NoSave.VI
                this.titleBtnDialog3 = Resource.TitleBtnDialog.Save.VI
                this.activeBtnDialog2 = true
            }
        },

        /**
         * Chọn hủy từ dialog ở pop-up --> ẩn dialog
         * Author: DVDUNG (21/09/2022)
         */
        hideForm(){
            this.isShowDialogDetail = false;
        },

        /**
         * Lưu dữ liệu từ form pop-up
         * Author: DVDUNG (21/09/2022)
         */
        saveData() {
            // validate dữ liệu
            this.titleErrValidate = []
            if (this.assetData.fixed_asset_code == null) {
                this.titleErrValidate.push(Resource.ErrorValidate.AssetCode.VI)
            }
            if (this.assetData.fixed_asset_name == null) {
                this.titleErrValidate.push(Resource.ErrorValidate.AssetName.VI)
            }
            if (this.assetData.department_code == null) {
                this.titleErrValidate.push(Resource.ErrorValidate.DepartmentCode.VI)
            }
            if (this.assetData.fixed_asset_category_code == null) {
                this.titleErrValidate.push(Resource.ErrorValidate.AssetCategoryCOde.VI)
            }
            if (this.assetData.quantity == null) {
                this.titleErrValidate.push(Resource.ErrorValidate.Quantity.VI)
            }
            if (this.formatCost == '') {
                this.titleErrValidate.push(Resource.ErrorValidate.Cost.VI)
            }
            if (this.assetData.depreciation_rate == null) {
                this.titleErrValidate.push(Resource.ErrorValidate.DepreciationRate.VI)
            }
            else this.assetData.depreciation_rate = parseInt(this.assetData.depreciation_rate)
            if (this.assetData.purchase_date == null) {
                this.titleErrValidate.push(Resource.ErrorValidate.PurchaseDate.VI)
            }
            if (this.assetData.production_date == null) {
                this.titleErrValidate.push(Resource.ErrorValidate.ProductionDate.VI)
            }
            if (this.assetData.life_time == null) {
                this.titleErrValidate.push(Resource.ErrorValidate.LifeTime.VI)
            }
            if (this.depreciationYear == null) {
                this.titleErrValidate.push(Resource.ErrorValidate.DepreciationYear.VI)
            }
            // console.log(this.titleErrValidate.toString())

            // Lưu dữ liệu
            // this.assetData.purchase_date = JSON.stringify(this.assetData.purchase_date);
            // this.assetData.fixed_asset_category_id
            // this.assetData.create_by="Đặng Văn Dũng"
            // this.assetData.create_date= this.assetData.purchase_date
            // this.assetData.modified_by="Đặng Văn Dũng"
            // this.assetData.modified_date=this.assetData.purchase_date

            console.log(this.assetData);
            
            // Thiết lập api để chỉnh sửa tài sản
            if(this.formMode == Enum.FormMode.Edit) {
                this.methodBtnSave = Resource.Method.PUT
                this.urlBtnSave = this.urlBtnSave + `/${this.assetData.fixed_asset_id}`
                console.log(this.urlBtnSave)
                this.showDialog()
            }

            // Thiết lập api để thêm mới tài sản
            if(this.formMode == Enum.FormMode.Add) {
                this.methodBtnSave = Resource.Method.POST
                console.log(this.urlBtnSave)
                this.callApiBtnSave();
            }

            if(this.formMode == Enum.FormMode.Duplicate) {
                this.methodBtnSave = Resource.Method.POST
                this.callApiBtnSave()
            }
        },

        /**
         * Gọi API để post, put, delete tài sản
         * Author: DVDUNG (1/10/2022)
         */
        callApiBtnSave() {
            try {
                if (this.titleErrValidate.length == 0) {
                    fetch(this.urlBtnSave, {method: this.methodBtnSave, headers:{ 'Content-Type': 'application/json'}, body: JSON.stringify(this.assetData)})
                        .then(res => res.json())
                        .then(res =>{
                            console.log(res.status);
                            if (!this.isShowDialogDetail) {
                                this.$emit("closeForm");
                            }
                        })
                        .catch(res => {
                            console.log(res);
                        })
                }
                else {
                    var title = ''
                    for(let i in this.titleErrValidate) {
                        title+=`<span class="mb-3">- ${this.titleErrValidate[i]}</span><br>`
                    }
                    this.titleBtnDialog3 = Resource.TitleBtnDialog.Close.VI
                    this.activeBtnDialog1 = false
                    this.titleDialogDetail = title
                    this.showDialog()
                }
            } 
            catch (error) {
                console.log(error)
            }
            
        },

        /**
         * Api lấy mã tài sản tự động tăng
         * Author: DVDUNG (3/10/2022)
         */
        callApiGetMaxCode() {
            try {
                var urlGetMaxCode = Resource.API.Asset.GET.MaxCode
                var method = Resource.Method.GET
                fetch(urlGetMaxCode, {method: method})
                        .then(res => res.json())
                        .then(data => {
                            this.maxCodeAsset = data.MaxAssetCode
                            let assetCode = this.maxCodeAsset.match(/[0-9]+$/);
                            let assetCodeResult = (assetCode)?assetCode[0]:null;
                            assetCodeResult = parseInt(assetCodeResult) + 1
                            this.assetData.fixed_asset_code = `TS${assetCodeResult}`
                        })
                        .catch(res => {
                            console.log(res);
                        })    
            } 
            catch (error) {
                console.log(error)
            }
        },  

        /**
         * Kiểm tra xem đã có dữ liệu khi blur ra khỏi input chưa
         * @param {*} data 
         * Author: DVDUNG (21/09/2022)
         */
        leaveFocusInput(data) {
            if (data == null) {
                // thêm border màu đỏ
                event.currentTarget.classList.add("errors");
                // Thêm title thông báo lỗi (tạm thời chưa làm vì chưa cần)
            }
            else {
                event.currentTarget.classList.remove("errors");
                
            }
        },

        // formatDeparate(value) {
        //     if (value == keycode)
        // }
        checkDepreciation(e) {
            if(e.keyCode == Enum.KeyCode.MINUS) {
                e.preventDefault();
            }
            console.log(this.depreciation)
        },

        /**
         * TabIndex không chạy ra khỏi form pop-up
         * Author: DVDUNG (25/09/2022)
         */
        focusInputOne() {
            this.$nextTick(() => {this.$refs.assetID.focus();})
        },
        
        /**
         * Tên bộ phận tự động điền
         * Author: DVDUNG (25/09/2022)
         */
        autoCompleteDepartmentName(id, code, name) {
            this.assetData.department_name = name;
            this.assetData.department_code = code;
            this.assetData.department_id = id;
            console.log(this.assetData.department_name);
        },

        /**
         * Tên loại tài sản tự động điền
         * Author: DVDUNG (25/09/2022)
         */
        autoCompleteAssetCategory(id, code, name, depreciationRate, lifeTime) {
            this.assetData.fixed_asset_category_name = name;
            this.assetData.fixed_asset_category_code = code;
            this.assetData.fixed_asset_category_id = id;
            this.assetData.depreciation_rate = depreciationRate;
            this.assetData.life_time = lifeTime;
            console.log(this.assetData.fixed_asset_category_name, lifeTime);
        },

        /**
         * Lấy ngày hiện tại
         * Author: DVDUNG (29/09/2022)
         */
        printYear: function () {
            return new Date().getFullYear()
          },

        currentDateTime() {
            return moment().format('YYYY-MM-DD')
        },

         /**
         * Format dữ liệu
         * Author: DVDUNG (19/09/2022)
         * @param {*} value 
         */
        //    Format money
        formatPrice(value) {
            try {
                let val = (value/1).toFixed(3).replace('.', '.')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            } catch (error) {
                console.log(error);
            }
        },

        
    },
    components: {DCombobox2, DDialog},
    
}
</script>


<style scoped>
    @import url('../../../css/base/form.css');
    @import url('../../../css/base/common.css');
    @import url('../../../css/base/combobox.css');
    @import url('../../../css/base/textfield.css');
    @import url('../../../css/base/dialog.css');
    @import url('../../../css/base/datepicker.css');
    
</style>