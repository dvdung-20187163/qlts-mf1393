<template>
  <div id="modal" class="modal" ref="modal" tabindex="-1" @keyup="keyEvent">
    <div class="form-asset">
      <div class="form-asset__header">
        <div class="form-asset__title">
          {{ titleForm }}
        </div>
        <div class="form-asset__icon icon-close" @click="closeForm"></div>
      </div>
      <div class="form-asset__body">
        <div class="double-input--1-2">
          <div class="box-text-field mr-16">
            <div class="label__text-field">
              Mã tài sản <span style="color: red">&#8727;</span>
            </div>
            <input
              type="text"
              class="text-field width-100"
              maxlength="20"
              ref="assetCode"
              v-model="fixedAssetCode"
              :class="{ errors: validateInput(fixedAssetCode) && isSubmit }"
              @blur="leaveFocusInput(fixedAssetCode)"
            />
          </div>
          <div class="box-text-field">
            <div class="label__text-field">
              Tên tài sản <span style="color: red">&#8727;</span>
            </div>
            <input
              type="text"
              class="text-field width-100"
              maxlength="255"
              placeholder="Nhập tên tài sản"
              v-model="fixedAssetName"
              :class="{ errors: validateInput(fixedAssetName) && isSubmit }"
              @blur="leaveFocusInput(fixedAssetName)"
            />
          </div>
        </div>
        <div class="double-input--1-2">
          <!-- combobox -->
          <div class="box-combobox mr-16">
            <div class="label__text-field">
              Mã bộ phận sử dụng <span style="color: red">&#8727;</span>
            </div>
            <d-combobox-2
              @autoComplete="autoCompleteDepartmentName"
              :api="this.urlGetDataDepartment"
              text="Chọn mã bộ phận sử dụng"
              keyCombobox="department_id"
              DataComboboxCode="department_code"
              :isValidate="isSubmit"
              :ModelInput="departmentCode"
            ></d-combobox-2>
          </div>
          <div class="box-text-field">
            <div class="label__text-field">Tên bộ phận sử dụng</div>
            <input
              type="text"
              class="text-field--disable width-100"
              v-model="departmentName"
              disabled
            />
          </div>
        </div>
        <div class="double-input--1-2">
          <!-- combobox -->
          <div class="box-combobox mr-16">
            <div class="label__text-field">
              Mã loại tài sản <span style="color: red">&#8727;</span>
            </div>
            <d-combobox-2
              @autoComplete="autoCompleteAssetCategory"
              :api="this.urlGetDataAssetCategory"
              text="Chọn mã loại tài sản"
              keyCombobox="fixed_asset_category_id"
              DataComboboxCode="fixed_asset_category_code"
              :isValidate="isSubmit"
              :ModelInput="fixedAssetCategoryCode"
            ></d-combobox-2>
          </div>
          <div class="box-text-field">
            <div class="label__text-field">Tên loại tài sản</div>
            <input
              type="text"
              class="text-field--disable width-100"
              v-model="fixedAssetCategoryName"
              disabled
            />
          </div>
        </div>
        <div class="three-input--1-1-1">
          <div class="box-text-field mr-16">
            <div class="label__text-field">
              Số lượng <span style="color: red">&#8727;</span>
            </div>
            <div class="combobox width-100 border-none">
              <input
                type="number"
                class="text-field width-100 pr-25"
                ref="quantity"
                v-model="quantity"
                :class="{ errors: validateInput(quantity) && isSubmit }"
                @blur="leaveFocusInput(quantity)"
              />
              <div class="combobox__box-selecte form-icon--selecte">
                <button
                  tabindex="-1"
                  class="btn-select select-icon--up mb-4"
                  @click="this.$refs.quantity.stepUp()"
                ></button>
                <button
                  tabindex="-1"
                  class="btn-select select-icon--down"
                  @click="this.$refs.quantity.stepDown()"
                ></button>
              </div>
            </div>
          </div>
          <div class="box-text-field mr-16">
            <div class="label__text-field">
              Nguyên giá <span style="color: red">&#8727;</span>
            </div>
            <CurrencyInput
              v-model="cost"
              :options="{
                currency: 'EUR',
                locale: 'de-De',
                currencyDisplay: 'hidden',
                hideCurrencySymbolOnFocus: 'false',
                precision: 0,
              }"
              class="text-field width-100 text-right"
              :class="{ errors: validateInput(cost) && isSubmit }"
              @blur="leaveFocusInput(cost)"
            />
          </div>
          <div class="box-text-field">
            <div class="label__text-field">
              Tỷ lệ hao mòn (%) <span style="color: red">&#8727;</span>
            </div>
            <div class="combobox width-100 border-none">
              <CurrencyInput
                v-model="depreciationRate"
                :options="{
                  currency: 'EUR',
                  locale: 'de-De',
                  currencyDisplay: 'hidden',
                  valueRange: { min: 0, max: 100 },
                  precision: 2,
                  hideCurrencySymbolOnFocus: 'false',
                }"
                class="text-field width-100 text-right"
                :class="{ errors: validateInput(depreciationRate) && isSubmit }"
                @blur="leaveFocusInput(depreciationRate)"
              />
            </div>
          </div>
        </div>
        <div class="three-input--1-1-1">
          <div class="box-text-field mr-16">
            <div class="label__text-field">
              Ngày mua <span style="color: red">&#8727;</span>
            </div>
            <div class="combobox width-100 border-none">
              <el-date-picker
                :class="{
                  errors: validateInput(assetData.purchase_date) && isSubmit,
                }"
                v-model="assetData.purchase_date"
                type="date"
                format="DD/MM/YYYY"
                value-format="YYYY-MM-DD"
              />
            </div>
          </div>
          <div class="box-text-field mr-16">
            <div class="label__text-field">
              Ngày bắt đầu sử dụng <span style="color: red">&#8727;</span>
            </div>
            <div class="combobox width-100 border-none">
              <el-date-picker
                class=""
                :class="{
                  errors: validateInput(assetData.production_date) && isSubmit,
                }"
                v-model="assetData.production_date"
                type="date"
                format="DD/MM/YYYY"
                value-format="YYYY-MM-DD"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="box-text-field">
            <div class="label__text-field">Năm theo dõi</div>
            <input
              type="number"
              class="text-field--disable width-100"
              v-model="assetData.tracked_year"
              disabled
            />
          </div>
        </div>
        <div class="three-input--1-1-1 mb-20">
          <div class="box-text-field mr-16">
            <div class="label__text-field">
              Số năm sử dụng <span style="color: red">&#8727;</span>
            </div>
            <div class="combobox width-100 border-none">
              <input
                type="number"
                class="text-field width-100 pr-25"
                min="0"
                ref="liftTime"
                v-model="lifeTime"
                :class="{ errors: validateInput(lifeTime) && isSubmit }"
                @blur="leaveFocusInput(lifeTime)"
              />
              <div class="combobox__box-selecte form-icon--selecte">
                <button
                  class="btn-select select-icon--up mb-4"
                  @click="this.$refs.liftTime.stepUp()"
                ></button>
                <button
                  class="btn-select select-icon--down"
                  @click="this.$refs.liftTime.stepDown()"
                ></button>
              </div>
            </div>
          </div>
          <div class="box-text-field mr-16">
            <div class="label__text-field">
              Giá trị hao mòn năm <span style="color: red">&#8727;</span>
            </div>
            <CurrencyInput
              v-model="depreciationYear"
              :options="{
                currency: 'EUR',
                locale: 'de-De',
                currencyDisplay: 'hidden',
                precision: 0,
                hideCurrencySymbolOnFocus: 'false',
              }"
              class="text-field width-100 text-right"
              :class="{ errors: validateInput(depreciationYear) && isSubmit }"
              @blur="leaveFocusInput(depreciationYear)"
            />
            <button @keyup.tab="focusSave" class="btn__tab"></button>
          </div>
        </div>
      </div>
      <div class="form-asset__footer">
        <button ref="cancel" class="btn outline-btn mr-10" @click="showDialog">
          Hủy
        </button>
        <button @keyup.tab="focusInputOne" class="btn__tab"></button>
        <button ref="save" class="btn main-btn" @click="saveData">Lưu</button>
        <button @keyup.tab="focusCancel" class="btn__tab"></button>
      </div>
    </div>

    <!-- Khi dùng component Dialog -->
    <d-dialog
      v-if="isShowDialogDetail"
      :header="headerDialogDetail"
      :title="titleDialogDetail"
      :titleBtn1="titleBtnDialog1"
      :titleBtn2="titleBtnDialog2"
      :titleBtn3="titleBtnDialog3"
      :activeBtn1="activeBtnDialog1"
      :activeBtn2="activeBtnDialog2"
    >
    </d-dialog>

    <DToastMessage v-if="isShowToastDetail" :text="toastText" />
  </div>
</template>

<script>
import { ElNotification } from "element-plus";
import DDialog from "@/components/base/DDialog.vue";
import DCombobox2 from "@/components/base/DCombobox2.vue";
import Enum from "../../../js/enum.js";
import Resource from "../../../js/resource.js";
import moment from "moment";
import CurrencyInput from "../../base/CurrencyInput.vue";
import DToastMessage from "@/components/base/DToastMessage.vue";
import formatPrice from "../../../js/utils.js"
// import axios from 'axios';

export default {
  name: "WorkspaceJsonAssetDetail",
  components: { DCombobox2, DDialog, CurrencyInput, DToastMessage },
  props: {
    assetSelected: {
      type: Object,
      default: () => null,
    },
    titleForm: {
      type: String,
    },
    formMode: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      checkDuplicate: "",
      isShowToastDetail: false,
      // v-model giá trị vào
      fixedAssetCode: "",
      fixedAssetName: "",
      departmentId: "",
      departmentCode: "",
      departmentName: "",
      fixedAssetCategoryId: "",
      fixedAssetCategoryCode: "",
      fixedAssetCategoryName: "",
      depreciationRate: "",
      quantity: "",
      cost: "",
      lifeTime: "",
      // Show dialog ở pop-up thêm tài sản
      isShowDialogDetail: false,
      invalidAssetCode: false,
      invalidAssetName: false,
      activeBtnDialog1: true,
      activeBtnDialog2: true,
      isSubmit: false,
      ctrlPressed: false,
      statusBackEnd: true,
      assetData: {},
      // Title
      headerDialogDetail: "",
      titleDialogDetail: Resource.TitleDialog.AddAsset.VI,
      titleBtnDialog1: Resource.TitleBtnDialog.NoCancel.VI,
      titleBtnDialog2: "",
      titleBtnDialog3: Resource.TitleBtnDialog.Cancel.VI,
      titleErrValidate: [],
      // url api
      urlGetDataAssetCategory:
        Resource.API.AssetCategory.GET.FilterAssetCategory,
      urlGetDataDepartment: Resource.API.Department.GET.FilterDepartment,
      urlBtnSave: Resource.API.Asset.GET.AllAsset,
      methodBtnSave: Resource.Method.POST,
      // format value
      formatQuantity: "",
      formatDepreciationRate: "",
      formatDepreciationYear: "",
      // Lưu keyCode
      keyCodeData: [],
    };
  },

  created() {
    // gán giá trị cho form khi chỉnh sửa, nhân bản
    this.assetData = { ...this.assetSelected };
    // console.log(this.assetData);
    const {
      department_id,
      fixed_asset_code,
      fixed_asset_name,
      department_code,
      department_name,
      fixed_asset_category_id,
      fixed_asset_category_name,
      fixed_asset_category_code,
      quantity,
      cost,
      depreciation_rate,
    } = this.assetData;
    this.departmentId = department_id;
    this.fixedAssetCode = fixed_asset_code;
    this.fixedAssetName = fixed_asset_name;
    this.departmentCode = department_code;
    this.departmentName = department_name;
    this.fixedAssetCategoryId = fixed_asset_category_id;
    this.fixedAssetCategoryName = fixed_asset_category_name;
    this.fixedAssetCategoryCode = fixed_asset_category_code;
    this.quantity = quantity;
    this.cost = cost || 0;
    this.depreciationRate =
      depreciation_rate * 100 ? depreciation_rate * 100 : 0;
    if (
      this.formMode == Enum.FormMode.Add ||
      this.formMode == Enum.FormMode.Duplicate
    ) {
      this.assetData.purchase_date = this.currentDateTime();
      this.assetData.production_date = this.currentDateTime();
      this.assetData.tracked_year = this.printYear();
      this.callApiGetMaxCode();
    }
    this.lifeTime = this.assetData.life_time;
    window.addEventListener("keydown", this.keyDownFormDetail);
  },

  destroys() {
    window.removeEventListener("keydown", this.keyDownFormDetail);
  },

  mounted() {
    this.$refs.assetCode.focus();
  },

  computed: {
    depreciationYear() {
      if (this.cost != null && this.depreciationRate != null) {
        let depreciation = (this.cost * this.depreciationRate) / 100;
        return depreciation;
      } else return 0;
    },

    formatCost() {
      let formatCode = this.assetData.cost;
      return formatPrice(formatCode);
    },

    compareDepreciationRate() {
      let compare = (1 / this.lifeTime).toFixed(4);
      return compare * 100;
    },
  },

  methods: {
    /**
     * Thêm phím tắt cho bàn phím
     * Author: DVDUNG (1/10/2022)
     */
    keyEvent(e) {
      // Bấm ESC để đóng form popup
      if (e.keyCode == Enum.KeyCode.ESC) {
        this.closeForm()
      } else if (e.which == Enum.KeyCode.CTRL) {
        this.ctrlPressed = true;
      } 
      // Bấm CTRL F8 để lưu
      else if (e.keyCode == Enum.KeyCode.F8 && this.ctrlPressed == true) {
        this.saveData();
        this.ctrlPressed = false;
      }
      // Bấm CTRL F9 để hủy bỏ
      else if (e.keyCode == Enum.KeyCode.F9 && this.ctrlPressed == true) {
        this.showDialog();
        this.ctrlPressed = false;
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
      this.$refs.assetCode.focus();
    },

    /**
     * Show toast message
     */
    showToastMessage() {
      this.isShowToastDetail = true;
      setTimeout(() => {
        this.isShowToastDetail = false;
      }, 1000);
    },

    /**
     * Chọn hủy bỏ (hủy bỏ tài sản) từ dialog ở pop-up thêm mới tài sản
     * --> Đóng pop-up và dialog
     * Author: DVDUNG (21/09/2022)
     */
    destroyForm() {
      // Nếu đang ở form chỉnh sửa tài sản thì sẽ lưu lại dữ liệu
      if (this.formMode == Enum.FormMode.Edit) {
        this.callApiBtnSave();
      }

      if (this.formMode == Enum.FormMode.Add) {
        if (this.titleErrValidate.length == 0) {
          this.closeForm();
        } else {
          this.isShowDialogDetail = false;
          this.$refs.assetCode.focus();
        }
      }
      this.isShowDialogDetail = false;
    },

    /**
     * Hiện dialog khi bấm nút hủy ở pop-up
     * Author: DVDUNG (21/09/2022)
     */
    showDialog() {
      // Thiết lập hiện dialog, title dialog, title btn dialog ở form thêm tài sản
      if (this.formMode == Enum.FormMode.Add) {
        this.titleDialogDetail = Resource.TitleDialog.AddAsset.VI;
        this.titleBtnDialog1 = Resource.TitleBtnDialog.NoCancel.VI;
        this.titleBtnDialog3 = Resource.TitleBtnDialog.Cancel.VI;
        this.activeBtnDialog2 = false;
        this.activeBtnDialog1 = true;
      }

      // Thiết lập hiện dialog, title dialog, title btn dialog ở form chỉnh sửa tài sản
      if (this.formMode == Enum.FormMode.Edit) {
        this.titleDialogDetail = Resource.TitleDialog.SaveUpdate.VI;
        this.titleBtnDialog1 = Resource.TitleBtnDialog.Cancel.VI;
        this.titleBtnDialog2 = Resource.TitleBtnDialog.NoSave.VI;
        this.titleBtnDialog3 = Resource.TitleBtnDialog.Save.VI;
        this.activeBtnDialog2 = true;
        this.activeBtnDialog1 = true;
      }
      this.isShowDialogDetail = true;
    },

    /**
     * Chọn hủy từ dialog ở pop-up --> ẩn dialog
     * Author: DVDUNG (21/09/2022)
     */
    hideForm() {
      this.isShowDialogDetail = false;
    },

    /**
     * Validate dữ liệu
     * Author: DVDUNG (7/10/2022)
     */
    async validateDataSave() {
      this.titleErrValidate = [];

      if (this.fixedAssetName == null || this.fixedAssetName == "") {
        this.titleErrValidate.push(Resource.ErrorValidate.AssetName.VI);
        this.validateInput(this.fixedAssetName);
      }

      if (this.departmentCode == null || this.departmentCode == "") {
        this.titleErrValidate.push(Resource.ErrorValidate.DepartmentCode.VI);
      }

      if (
        this.fixedAssetCategoryCode == null ||
        this.fixedAssetCategoryCode == ""
      ) {
        this.titleErrValidate.push(Resource.ErrorValidate.AssetCategoryCode.VI);
      }

      if (this.quantity == null || this.quantity == "") {
        this.titleErrValidate.push(Resource.ErrorValidate.Quantity.VI);
      }

      if (this.cost == null || this.cost == "") {
        this.titleErrValidate.push(Resource.ErrorValidate.Cost.VI);
      }

      if (this.depreciationRate == null || this.depreciationRate == "") {
        this.titleErrValidate.push(Resource.ErrorValidate.DepreciationRate.VI);
      } else {
        // console.log(this.compareDepreciationRate.toFixed(2));
        if (this.depreciationRate != this.compareDepreciationRate.toFixed(2)) {
          this.titleErrValidate.push(
            Resource.ErrorValidate.CompareDepreciationRate.VI
          );
        }
      }

      if (this.assetData.purchase_date == null || this.purchase_date == "") {
        this.titleErrValidate.push(Resource.ErrorValidate.PurchaseDate.VI);
      }

      if (
        this.assetData.production_date == null ||
        this.production_date == ""
      ) {
        this.titleErrValidate.push(Resource.ErrorValidate.ProductionDate.VI);
      }

      if (this.lifeTime == null || this.lifeTime == "") {
        this.titleErrValidate.push(Resource.ErrorValidate.LifeTime.VI);
      }

      if (this.depreciationYear == null || this.depreciationYear == "") {
        this.titleErrValidate.push(Resource.ErrorValidate.DepreciationYear.VI);
      } else {
        if (this.depreciationYear >= this.cost) {
          this.titleErrValidate.push(
            Resource.ErrorValidate.CompareDepreciationYear.VI
          );
        }
      }
    },

    /**
     * Chuẩn bị dữ liệu đẩy vào database
     * Author: DVDUNG (7/10/2022)
     */
    pushData() {
      this.assetData.fixed_asset_code = this.fixedAssetCode;
      this.assetData.fixed_asset_name = this.fixedAssetName;
      this.assetData.department_id = this.departmentId;
      this.assetData.department_code = this.departmentCode;
      this.assetData.department_name = this.departmentName;
      this.assetData.fixed_asset_category_id = this.fixedAssetCategoryId;
      this.assetData.fixed_asset_category_code = this.fixedAssetCategoryCode;
      this.assetData.fixed_asset_category_name = this.fixedAssetCategoryName;
      this.assetData.quantity = this.quantity;
      this.assetData.cost = this.cost;
      this.assetData.depreciation_rate = this.depreciationRate / 100;
      this.assetData.life_time = this.lifeTime;
      this.depreciation_year = this.depreciationYear;
      this.modified_date = null;
      this.created_date = null;
    },

    /**
     * Lưu dữ liệu từ form pop-up
     * Author: DVDUNG (21/09/2022)
     */
    saveData() {
      console.log(this.assetData.fixed_asset_code);
      this.isSubmit = true;

      this.validateDataSave();
      if (this.titleErrValidate.length == 0) {
        this.pushData();
      }

      // Thiết lập api để chỉnh sửa tài sản
      if (this.formMode == Enum.FormMode.Edit) {
        this.methodBtnSave = Resource.Method.PUT;
        this.urlBtnSave =
          Resource.API.Asset.PUT.UpdateOne +
          `/${this.assetData.fixed_asset_id}`;
        console.log(this.urlBtnSave);
      }

      // Thiết lập api để thêm mới tài sản
      if (this.formMode == Enum.FormMode.Add) {
        this.methodBtnSave = Resource.Method.POST;
        this.urlBtnSave = Resource.API.Asset.POST.InsertOne;
        this.titleDialogDetail = Resource.TitleDialog.AddAsset.VI
        console.log(this.urlBtnSave);
      }

      if (this.formMode == Enum.FormMode.Duplicate) {
        this.methodBtnSave = Resource.Method.POST;
        this.urlBtnSave = Resource.API.Asset.POST.InsertOne;
      }
      this.callApiBtnSave();
    },

    /**
     * Hiển thị dialog validate
     * Author: DVDUNG (7/10/2022)
     */
    showDialogValidate() {
      let title = ``;
      for (let i in this.titleErrValidate) {
        title += `<span class="mb-3">- ${this.titleErrValidate[i]}</span><br>`;
      }
      this.headerDialogDetail= Resource.ErrorValidate.Header.VI
      this.titleBtnDialog3 = Resource.TitleBtnDialog.Close.VI;
      this.activeBtnDialog1 = false;
      this.activeBtnDialog2 = false;
      this.titleDialogDetail = title;
      this.isShowDialogDetail = true;
    },

    /**
     * Gọi API để post, put, delete tài sản
     * Author: DVDUNG (1/10/2022)
     */
    callApiBtnSave() {
      try {
        if (this.titleErrValidate.length == 0) {
          fetch(this.urlBtnSave, {
            method: this.methodBtnSave,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.assetData),
          })
            .then((res) => {
              var status = res.status
                    switch(status) {
                        // case 200 || 201: 
                        
                        //   break
                        case 400: 
                            this.titleErrValidate.push(Resource.ErrorValidate.DuplicateCode.VI)
                            this.showDialogValidate()
                            break
                        case 404: 
                            this.statusBackEnd = false
                            this.titleBtnDialog3 = Resource.TitleBtnDialog.Close.VI
                            this.activeBtnDialog1 = false
                            this.activeBtnDialog2 = false
                            this.titleDialogDetail = Resource.TitleDialog.BackEnd404.VI
                            this.isShowDialogDetail = true
                            break
                        case 500: 
                            this.statusBackEnd = false
                            this.titleBtnDialog3 = Resource.TitleBtnDialog.Close.VI
                            this.activeBtnDialog1 = false
                            this.activeBtnDialog2 = false
                            this.titleDialogDetail = Resource.TitleDialog.BackEnd500
                            this.isShowDialogDetail = true
                            break
                        default: 
                          this.statusBackEnd = true
                          this.isShowDialog = false;
                    }
            })
            .then(() => {
              if (!this.isShowDialogDetail) {
                  this.$emit("closeForm");
                  if(this.statusBackEnd) {
                  ElNotification({
                  duration: 1500,
                  message: Resource.TextToast.Success.Save.VI,
                  position: "bottom-right",
                  showClose: false,
                  type: "success",
                  customClass: "font-default"
                })
                this.$parent.selectPage(0);
                }
                }
                // Toast message
               
            })
            .catch((res) => {
              console.log(res.message)
            })
        } else {
          this.showDialogValidate();
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Api lấy mã tài sản tự động tăng
     * Author: DVDUNG (3/10/2022)
     */
    callApiGetMaxCode() {
      try {
        let urlGetMaxCode = Resource.API.Asset.GET.MaxCode;
        let method = Resource.Method.GET;
        fetch(urlGetMaxCode, { method: method })
          .then((res) => res.text())
          .then((data) => {
            let assetCode = data.match(/[0-9]+$/);
            let assetCodeResult = assetCode ? assetCode[0] : null;
            assetCodeResult = parseInt(assetCodeResult) + 1;
            this.fixedAssetCode = `TS${assetCodeResult}`;
          })
          .catch((res) => {
            console.log(res);
          });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Kiểm tra xem đã có dữ liệu khi blur ra khỏi input chưa
     * @param {*} data
     * Author: DVDUNG (21/09/2022)
     */
    leaveFocusInput(data) {
      if (data == null || data == "") {
        // thêm border màu đỏ
        event.currentTarget.classList.add("errors");
        // Thêm title thông báo lỗi (tạm thời chưa làm vì chưa cần)
      } else {
        event.currentTarget.classList.remove("errors");
      }
    },

    /**
     * Thêm border đỏ vào input khi validate
     * Author: DVDUNG (8/10/2022)
     */
    validateInput(data) {
      if (data == null || data == "") {
        return true;
      }
    },

    // formatDeparate(value) {
    //     if (value == keycode)
    // }
    checkDepreciation(e) {
      if (e.keyCode == Enum.KeyCode.MINUS) {
        e.preventDefault();
      }
      // console.log(this.depreciation);
    },

    /**
     * TabIndex không chạy ra khỏi form pop-up
     * Author: DVDUNG (25/09/2022)
     */
    focusInputOne() {
      this.$refs.assetCode.focus();
    },

    focusSave() {
      this.$refs.save.focus();
    },

    focusCancel() {
      this.$refs.cancel.focus();
    },

    /**
     * Tên bộ phận tự động điền
     * Author: DVDUNG (25/09/2022)
     */
    autoCompleteDepartmentName(data) {
      this.departmentId = data.department_id;
      this.departmentName = data.department_name;
      this.departmentCode = data.department_code;
    },

    /**
     * Tên loại tài sản tự động điền
     * Author: DVDUNG (25/09/2022)
     */
    autoCompleteAssetCategory(data) {
      this.fixedAssetCategoryId = data.fixed_asset_category_id;
      this.fixedAssetCategoryCode = data.fixed_asset_category_code;
      this.fixedAssetCategoryName = data.fixed_asset_category_name;
      this.depreciationRate = data.depreciation_rate * 100;
      this.lifeTime = data.life_time;
      // console.log(data.fixed_asset_category_id, data.life_time);
    },

    /**
     * Lấy ngày hiện tại
     * Author: DVDUNG (29/09/2022)
     */
    printYear: function () {
      return new Date().getFullYear();
    },

    /**
     * Lấy ngày tháng năm hiện tại
     * Author: DVDUNG (29/09/2022)
     */
    currentDateTime() {
      return moment().format("YYYY-MM-DD");
    },

    /**
     * Format dữ liệu
     * Author: DVDUNG (19/09/2022)
     * @param {*} value
     */
    //    Format money
    formatMoney(value) {
      return formatPrice(value)
    },
  },
};
</script>

<style scoped>
@import url("../../../css/base/form.css");
@import url("../../../css/base/common.css");
@import url("../../../css/base/combobox.css");
@import url("../../../css/base/textfield.css");
@import url("../../../css/base/dialog.css");
@import url("../../../css/base/datepicker.css");

</style>
