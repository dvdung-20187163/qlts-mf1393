<template>
    <div class="page-content">
        <!-- Thanh toolbar -->
        <div class="content-box1">
            <div class="content-box1__left">
                <div class="box-input mr-10">
                    <div class="input-icon icon-search"></div>
                    <input type="text" class="input input-search" placeholder="Search ....." v-model="keyword">
                </div>
                <div class="box-combobox mr-10">
                    <d-combobox 
                    :api="this.urlGetDataAssetCategory" 
                    text="Loại tài sản"
                    keyCombobox="fixed_asset_category_id"
                    DataComboboxName="fixed_asset_category_name"
                    @getIdData="getIdDataAssetCategory"
                    ></d-combobox>
                </div>
                <div class="box-combobox mr-10">
                    <d-combobox 
                    :api="this.urlGetDataDepartment" 
                    text="Bộ phận sử dụng"
                    keyCombobox="department_id"
                    DataComboboxName="department_name"
                    @getIdData="getIdDataDepartment"
                    ></d-combobox>
                </div>
            </div>
            <div class="content-box1__right">
                <button class="btn main-btn pl-24" @click="btnAddAsset">Thêm tài sản
                    <div class="icon-plus"></div>
                </button>
                <button class="btn-only-icon ml-11">
                    <div class="icon-excel" @mouseover="upHereIconExport = true" @mouseleave="upHereIconExport = false">
                        <d-tool-tip v-show="upHereIconExport" class="mt-44" text="Xuất"></d-tool-tip>
                    </div>
                </button>
                <button class="btn-only-icon ml-11">
                    <div class="icon-delete" @click="deleteAsset" @mouseover="upHereIconDelete = true" @mouseleave="upHereIconDelete = false">
                        <d-tool-tip v-show="upHereIconDelete" class="mt-44" text="Xóa"></d-tool-tip>
                    </div>
                </button>
                <div class="content-box__combo-btn">
                </div>
            </div>
        </div>

        <!-- Content table -->
        <div class="content-table">
            <table class="table">
                <thead>
                    <th class="text-align-centre" style="width: 13px;">
                        <input type="checkbox" class="checkbox-x" @click="checkAll">
                    </th>
                    <th class="text-align-left" style="width: 30px;" 
                        @mouseover="upHereSTT= true" @mouseleave="upHereSTT= false">STT
                        <d-tool-tip v-show="upHereSTT" class="mt-44" text="Số thứ tự" style="font-weight: 500"></d-tool-tip>
                    </th>
                    <th class="text-align-left" style="width: 80px;">Mã tài sản</th>
                    <th class="text-align-left">Tên tài sản</th>
                    <th class="text-align-left">Loại tài sản</th>
                    <th class="text-align-left" style="width: 180px;">Bộ phận sử dụng</th>
                    <th class="text-align-right" style="width: 60px;">Số lượng</th>
                    <th class="text-align-right" style="width: 80px;">Nguyên giá</th>
                    <th class="text-align-right" style="width: 80px;"
                    @mouseover="upHereHMKH= true" @mouseleave="upHereHMKH= false">HM/KH lũy kế
                        <d-tool-tip v-show="upHereHMKH" class="ml-16 mt-44" text="Hao mòn, khấu hao lũy kế" style="font-weight: 500"></d-tool-tip>

                    </th>
                    <th class="text-align-right" style="width: 8px;">Giá trị còn lại</th>
                    <th class="text-align-centre" style="width: 100px;">Chức năng</th>
                </thead>
                <tbody>
                    <tr v-for="(asset,index) in assets" :key="asset.fixed_asset_id" 
                    @dblclick="rowDoubleClick(asset)" 
                    :class="{ isSelectRow : filterCheckbox(asset.fixed_asset_id)}"
                    >
                        <td class="text-align-centre" style="width: 13px;">
                            <input type="checkbox" class="checkbox-x" 
                            :value="asset.fixed_asset_id"
                            v-model="listIdAsset">
                        </td>
                        <td class="text-align-left">{{index + 1}}</td>
                        <td class="text-align-left">{{asset.fixed_asset_code}}</td>
                        <td class="text-align-left">{{asset.fixed_asset_name}}</td>
                        <td class="text-align-left">{{asset.fixed_asset_category_name}}</td>
                        <td class="text-align-left">{{asset.department_name}}</td>
                        <td class="text-align-right">{{asset.quantity}}</td>
                        <td class="text-align-right">
                            {{ formatPrice(asset.cost) }}
                        </td>
                        <td class="text-align-right">
                            {{ formatPrice(asset.depreciation_rate *asset.cost/100) }}
                        </td>
                        <td class="text-align-right">
                            {{ formatPrice(asset.cost-asset.depreciation_rate *asset.cost/100) }}
                        </td>
                        <td class="text-align-centre" style="width: 100px;">
                            <d-function-icon  @showFormChange="rowDoubleClick(asset)" @showFormDuplicate ="showFormDuplicate(asset)" ></d-function-icon>
                        </td>
                    </tr>

                </tbody>
                <tfoot>
                    <tr class="row-slected">
                        <td colspan="6">
                            <div class="paging">
                                <div class="paging-left">
                                    <div class="total-record">Tổng số <b>{{totalCount}}</b> bản ghi</div>
                                    <div class="record-page" @mouseleave="leaveRecordPage">
                                        <div class="record-page__title mr-10">
                                            {{ limit }}
                                            <ul v-show="isShowLimit" class="record-page__limit">
                                                <li v-for="(pageSize, index) of pageSizes" :key="index"
                                                @click="changePageSize(pageSize)">
                                                {{pageSize}}</li>
                                            </ul>
                                        </div>
                                        <button class="btn-select select-icon--down" @click="showLimit">
                                            
                                        </button>
                                    </div>
                                    <div class="page-number">
                                        <div class="page-number__list">
                                            <div class="demo-pagination-block">
                                                <div class="demonstration"></div>
                                                <el-pagination
                                                v-model:currentPage="currentPage"
                                                v-model:page-size="limit"
                                                :page-sizes="[]"
                                                pager-count="4"
                                                layout="prev, pager, next"
                                                :total="this.totalCount"
                                                @click="selectPage(currentPage-1)"
                                                />
                                            </div>
                                            <!-- <button class="number-btn"
                                                v-for="(pageNumber,index) in pageCount" :key="index"
                                                @click="selectPage(pageNumber)"
                                            >
                                                <div>{{ pageNumber }}</div>
                                            </button> -->
                                            <!-- <button class="number-btn">1</button>
                                            <button class="number-btn">2</button>
                                            <button class="number-btn">3</button> -->
                                            <!-- <span class="number-plus">...</span>
                                            <button class="number-btn btn-10">10</button> -->
                                        </div>
                                        <!-- <div class="page-number__last" 
                                        @mouseover="upHerePageNumberLast = true" 
                                        @mouseleave="upHerePageNumberLast = false"
                                        @click="selectPage(this.currentPage+=1)">
                                            <d-tool-tip v-show="upHerePageNumberLast" class="ml-16" text="Tới trang sau"></d-tool-tip>
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="text-align-right fw-700" style="width: 60px;">12345</td>
                        <td class="text-align-right fw-700" style="width: 100px;">
                            {{ formatPrice(249000) }}
                        </td>
                        <td class="text-align-right fw-700" style="width: 100px;">
                            {{ formatPrice(19716) }}
                        </td>
                        <td class="text-align-right fw-700" style="width: 100px;">
                            {{ formatPrice(229284) }}
                        </td>
                        <td class="text-align-centre" style="width: 100px;"></td>
                    </tr>
                </tfoot>
            </table>
        </div> 
        <d-toast-message v-show="isShowToast" @saveData="saveDataDetail"></d-toast-message> 
        <d-dialog v-if="isShowDialog" 
        :title="titleDialogDetail" 
        :activeBtn1="activeBtnDialog1"
        :titleBtn1="titleBtnDialog1"
        :titleBtn3="titleBtnDialog3"></d-dialog>
    </div>
    <asset-detail v-if="isShow" 
    @closeForm="closeFormDetail" 
    :assetSelected="assSlected" 
    :titleForm="this.titleForm" 
    :formMode="formModeDetail"></asset-detail>
    <div v-if="isLoading" class="loading">
        <div class="half-circle-spinner">
            <div class="circle circle-1"></div>
            <div class="circle circle-2"></div>
        </div>
    </div>
</template>

<script>
import DToolTip from '../../base/DToolTip.vue'
import AssetDetail from './AssetDetail.vue';
import DFunctionIcon from '@/components/base/DFunctionIcon.vue';
import DToastMessage from '@/components/base/DToastMessage.vue';
import DCombobox from '@/components/base/DCombobox.vue';
import DDialog from '@/components/base/DDialog.vue';
import Resource from '@/js/resource.js';
import Enum from '@/js/enum.js'

export default {
    name: 'WorkspaceJsonAssetList',
    components: {
    DToolTip,
    AssetDetail,
    DFunctionIcon,
    DToastMessage,
    DCombobox,
    DDialog
},
    created() {
        this.selectPage(0); 
        window.addEventListener('keydown', this.keyDownBtn)
    },

    destroys() {
        window.removeEventListener('keydown', this.keyDownBtn)
    },

    props: {

    },

    data() {
        return {
            items: ['Gaming', 'Programming', 'Vue', 'Vuetify'],
            model: ['Vuetify'],
            search: null,

            // url
            urlGetDataAssetCategory: Resource.API.AssetCategory.GET.AllAssetCategory,
            urlGetDataDepartment: Resource.API.Department.GET.AllDepartment,
            urlGetDataFromApi: Resource.API.Asset.GET.FilterAsset,
            // Lưu dữ liệu từ api
            assSlected: {},
            assets: [],
            // Lưu dữ liệu id khi checkbox
            listIdAsset: [],
            // Lưu keyCode
            keyCodeData: [],
            // Sử dụng để hiển thị
            isLoading: false,
            isShow: false,
            isShowToast: false,
            isShowDialog: false,
            upHereSTT: false,
            upHereIconExport: false,
            upHereIconDelete: false,  
            upHereHMKH: false,
            upHerePageNumberFirst: false,
            upHerePageNumberLast: false,
            selectAll: false,
            activeBtnDialog1: true,
            // Title
            titleForm: '', 
            titleDialogDetail: '',
            titleBtnDialog1: Resource.TitleBtnDialog.NoCancel.VI,
            titleBtnDialog3: Resource.TitleBtnDialog.Delete.VI,
            // phân trang
            currentPage: '',
            isShowLimit: false,
            limit: 20,
            offset: 0,
            pageCount: '',
            pageSizes: [15, 20, 25, 30, 40],
            // Lọc 
            keyword: '',
            filterAssetCategory: '',
            filterDepartment: '',
            totalCount: '',
            // Form mode
            formModeDetail: '',
        };
    },

    unmounted() {
        
    },
    
    computed: {
       
    },

    watch: {
        model (val) {
        if (val.length > 5) {
          this.$nextTick(() => this.model.pop())
        }
      },
    },
    
    methods: {
        /**
         * Sự kiện khi sử dụng bàn phím
         * Author: DVDUNG (1/10/2022)
         */
        keyDownBtn(event) {
            console.log(event.keyCode)
            // Bấm Insert để mở form thêm mới tài sản
            if (event.keyCode == Enum.KeyCode.INSERT) {
                this.btnAddAsset()
            }
            
            // Bấm Delete để xóa tài sản 
            if (event.keyCode == Enum.KeyCode.DELETE) {
                this.deleteAsset()
            }

            // Bấm Enter để đóng dialog
            if (event.keyCode == Enum.KeyCode.ENTER) {
                this.closeDialog()
            }

            // Bấm Ctrl + S để lưu tài sản
            if (event.keyCode == Enum.KeyCode.CTRL) {
                this.keyCodeData.push(event.keyCode)
                event.stopPropagation();
            } 
            else if (event.keyCode == Enum.KeyCode.ENTER) {
                    if (this.keyCodeData[0] == Enum.KeyCode.CTRL) {
                        this.keyCodeData.push(event.keyCode)
                        console.log('lưu dữ liệu')
                        this.keyCodeData = []   
                    } else this.keyCodeData = []
                } 
                else {
                    this.keyCodeData = []
                }
        },

        /** Hiện pop-up thêm tài sản
         * Author: DVDUNG (19/09/2022)
         */
        btnAddAsset() {
            this.isShow = true;
            this.assSlected = {};
            this.titleForm = Resource.TitleFormPopup.FormAddAsset.VI;
            this.formModeDetail = Enum.FormMode.Add;
        },


        /**
         * Hiện pop-up chỉnh sửa tài sản
         * Author: DVDUNG (19/09/2022)
         */
        rowDoubleClick(fixed_asset_id) {
            this.assSlected = fixed_asset_id,
            // console.log(this.assSlected)
            this.isShow = true;
            this.titleForm = Resource.TitleFormPopup.FormUpdateAsset.VI;
            this.formModeDetail = Enum.FormMode.Edit;
        },
        
        // /**
        //  * Hiện pop-up chỉnh sửa tài sản
        //  * Author: DVDUNG (19/09/2022)
        //  */   
        // showFormChangeDetail(asset) {
        //     // this.isShow = true;
        //     // this.titleForm = Resource.TitleFormPopup.FormUpdateAsset.VI;
        //     // this.formModeDetail = Enum.FormMode.Edit
        //     this.rowDoubleClick(asset)
        // },

        /**
         * Hiện pop-up nhân bản tài sản
         * Author: DVDUNG (19/09/2022)
         */
        showFormDuplicate(fixed_asset_id) {
            this.isShow = true;
            this.rowDoubleClick(fixed_asset_id)
            this.titleForm = Resource.TitleFormPopup.FormDuplicateAsset.VI;
            this.formModeDetail = Enum.FormMode.Duplicate
        },

        /**
         * Đóng pop-up
         * Author: DVDUNG (19/09/2022)
         */
        closeFormDetail() {
            this.isShow = false
        },

        /**
         * Lưu tài sản
         * Author: DVDUNG (19/09/2022)
         */
        saveDataDetail() {
            this.isShowToast = true;
            console.log(this.isShowToast)
        },
        
        /**
         * Xóa tài sản
         * Author: DVDUNG (21/09/2022)
         */
        deleteAsset() {
            if (this.listIdAsset.length == 0) {
                this.activeBtnDialog1 = false;
                this.titleDialogDetail = Resource.TitleDialog.DeleteNoData.VI;
                this.titleBtnDialog3 = Resource.TitleBtnDialog.Close.VI
                console.log(this.titleDialogDetail)
            }
            if (this.listIdAsset.length == 1) {
                this.titleBtnDialog1 = Resource.TitleBtnDialog.NoCancel.VI
                this.titleBtnDialog3 = Resource.TitleBtnDialog.Delete.VI
                this.titleDialogDetail = Resource.TitleDialog.DeleteOneAsset.VI + ` <b>${this.listIdAsset.length}</b> không?`
            }
            if ((this.listIdAsset.length > 1)) {
                this.titleDialogDetail = `<b>${this.listIdAsset.length}</b> ` + Resource.TitleDialog.DeleteMultiple.VI
            }
            this.isShowDialog = true;
        },

        /**
         * Đóng dialog xóa tài sản (ấn vào không)
         * Author: DVDUNG (21/09/2022)
         */
        closeDialog() {
            this.isShowDialog = false;
        },

        /**
         * Chọn Xóa (xóa tài sản) từ dialog ở pop-up thêm mới tài sản
         * --> Đóng dialog và xóa tài sản
         * Author: DVDUNG (21/09/2022)
         */
        destroys() {
            var url = Resource.API.Asset.DELETE.DeleteOne
            var method = Resource.Method.DELETE
            if (this.listIdAsset.length == 1) {
                url = url + `${this.listIdAsset[0]}`
                console.log(this.listIdAsset[0])
                console.log(url)
            }
            fetch(url, {method: method, 
                headers:{ 'Content-Type': 'application/json'}, 
                body: JSON.stringify(this.assetData)})
            .then(res => res.json())
            .then(res =>{
                console.log(res.status)
                this.isShowDialog = false;
            })
            .catch(res => {
                console.log(res);
            })
            this.isShowDialog = false;
           
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

        /**
         * Chọn checkbox (khi tích vào checkbox trên trong thẻ tbody)
         * Author: DVDUNG (24/09/2022)
         * @param {*} id 
         */
      
        filterCheckbox(id) {
            // console.log(id);
            try {
                for (let checkId of this.listIdAsset) {
                // console.log(checkId)
                if (id == checkId) {
                    return true;
                }
            }
            return false;
            } 
            catch(error) {
                console.log(error)
            }
        },

        /**
         * Khi tích vào checkbox trong thẻ thead thì tất cả checkbox khác đều được tích
         * Author: DVDUNG (24/09/2022)
         */
        checkAll() {
            try {
                this.listIdAsset = [];
            if (!this.selectAll) {
                for (let i of this.assets) {
                    // console.log("i co gia  tri la",i.fixed_asset_id)
                    this.listIdAsset.push(i.fixed_asset_id);
                }
            }
            console.log(this.listIdAsset)
            this.selectAll = !this.selectAll
            } catch(error) {
                console.log(error)
            }
        },

        /**
         * Thay đổi số bản ghi trên 1 trang
         * Author: DVDUNG (29/09/2022)
         * @param {*} pageSize 
         */
         changePageSize(pageSize) {
            this.limit = pageSize
            this.isShowLimit = false;   
            console.log(this.limit)
        },

        /**
         * Ẩn data số bản ghi trên một trang khi mouse leave khỏi ô
         * Author: DVDUNG (29/09/2022)
         */
        leaveRecordPage() {
            this.isShowLimit = false;
        },

        /**
         * Ẩn data số bản ghi trên một trang khi click vào data
         * Author: DVDUNG (29/09/2022)
         */
        showLimit() {
            this.isShowLimit = !this.isShowLimit;
        },

        /**
         * Load lại trang khi chuyển trang
         * Author: DVDUNG (29/09/2022)
         * @param {*} page 
         */
        selectPage(page) {
            try {
                console.log('đây là category',this.filterAssetCategory)

                this.offset = (page)*this.limit
                this.urlGetDataFromApi=Resource.API.Asset.GET.FilterAsset +`&keyword=${this.keyword}&assetCategoryID=${this.filterAssetCategory}&departmentID=${this.filterDepartment}&offset=${this.offset}&limit=${this.limit}`
              
                console.log(this.urlGetDataFromApi)
                this.isLoading = true;
                fetch(this.urlGetDataFromApi, {method: "GET"})
                .then(res=>res.json())
                .then(data=> {
                    this.assets = data.data
                    this.totalCount = data.totalCount
                    this.pageCount = data.totalCount/this.limit
                    this.isLoading = false
                    console.log(data)
                })
                .catch(res=>{
                    console.log(res);
                    this.isLoading = false;
                });
            } catch (error) {
                console.log(error)
            }
        },

        /**
         * Lấy id loại tài sản từ combobox
         * Author: DVDUNG (1/10/2022)
         */
        getIdDataAssetCategory(id) {
            this.filterAssetCategory = id
        },

        /**
         * Lấy id bộ phận sử dụng từ combobox
         * Author: DVDUNG (1/10/2022)
         */
        getIdDataDepartment(id) {
            this.filterDepartment = id 
        }
        
    },
    
};
</script>

<style scoped>
    @import url('../../../css/layout/content.css');
    @import url('../../../css/base/common.css');
    @import url('../../../css/base/combobox.css');
    @import url('../../../css/base/button.css');
    @import url('../../../css/base/input.css');
    @import url('../../../css/base/table.css');
    @import url('../../../css/base/paging.css');
    @import url('../../../css/base/loading.css');
    

.isSelectRow {
    background-color: #d1edf4;
}
</style>


