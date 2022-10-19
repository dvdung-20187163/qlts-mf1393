const API_URL = process.env.API_URL

export default {
    ErrorValidate: {
        Header: {
            VI: "Dữ liệu đầu vào không hợp lệ"
        },
        AssetName: {
            VI: "Cần phải nhập tên tài sản",
            EN: "Asset name is not empty"
        },
        AssetCode: {
            VI: "Cần phải nhập mã tài sản",
            EN: "Asset code is not empty"
        },
        DepartmentCode: {
            VI: "Cần phải nhập mã bộ phận sử dụng",
            EN: "Department code is not empty"
        },
        AssetCategoryCode: {
            VI: "Cần phải nhập mã loại tài sản",
            EN: "Asset category code number is not empty"
        },
        Quantity: {
            VI: "Cần phải nhập số lượng"
        },
        Cost: {
            VI: "Cần phải nhập nguyên giá"
        },
        DepreciationRate: {
            VI: "Cần phải nhập tỷ lệ hao mòn"
        },
        CompareDepreciationRate: {
            VI: "Tỷ lệ hao mòn phải bằng 1/số năm sử dụng"
        },
        PurchaseDate: {
            VI: "Cần phải nhập ngày mua"
        },
        ProductionDate: {
            VI: "Cần phải nhập ngày bắt đầu sử dụng"
        },
        LifeTime: {
            VI: "Cần phải nhập số năm sử dụng"
        },
        DepreciationYear: {
            VI: "Cần phải nhập giá trị hao mòn năm"
        },
        CompareDepreciationYear: {
            VI: "Giá trị hao mòn năm phải nhỏ hơn nguyên giá"
        },
        DuplicateCode: {
            VI: "Mã tài sản đã tồn tại"
        }
    },
    
    TitleFormPopup: {
        FormAddAsset: {
            VI: "Thêm mới tài sản",
            EN: "Add new asset"
        },
        FormUpdateAsset: {
            VI: "Chỉnh sửa tài sản",
            EN: "Edit assets"
        },
        FormInfoAsset: {
            VI: "Thông tin tài sản",
            EN: "Asset information"
        },
        FormDuplicateAsset: {
            VI: "Nhân bản tài sản",
            EN: "Duplicate asset"
        }
    },
    TitleDialog: {
        DeleteNoData: {
            VI: "Bạn chưa chọn tài sản để xóa",
            EN: "You have not selected an asset to delete"
        },
        DeleteOneAsset: {
            VI: "Bạn có muốn xóa tài sản",
            EN: "Do you want to delete assets?"
        },
        DeleteMultiple: {
            VI: "tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách?",
            EN: "asset has been selected. Do you want to remove these assets from the list?"
        },
        AddAsset: {
            VI: "Bạn có muốn hủy bỏ khai báo tài sản này?"
        },
        SaveUpdate: {
            VI: "Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?"
        },
        BackEnd400: {
            VI: "Dữ liệu đầu vào ko hợp lệ"
        },
        BackEnd404: {
            VI: "Phương thức yêu cầu của bạn không hợp lệ hoặc không được cho phép tại server"
        },
        BackEnd500: {
            VI: "Lỗi phía Serve"
        }
    },
    TitleBtnDialog: {
        Cancel: {
            VI: "Hủy bỏ",
        },
        NoCancel: {
            VI: "Không",
        },
        NoSave: {
            VI: "Không lưu",
        },
        Save: {
            VI: "Lưu",
        },
        Close: {
            VI: "Đóng"
        },
        Delete: {
            VI: "Xóa"
        }
    },
    API: {
        Asset: {
            GET: {
                AllAsset: `${API_URL}/Assets`,
                AssetById: `${API_URL}/Assets`,
                MaxCode: `${API_URL}/Assets/maxCode`,
                FilterAsset: `${API_URL}/Assets/filters?`,
                DuplicateCode: `${API_URL}/Assets/duplicate-code/`,
            },
            POST: {
                InsertOne: `${API_URL}/Assets`,
            },
            PUT: {
                UpdateOne: `${API_URL}/Assets`,
            },
            DELETE: {
                DeleteOne: `${API_URL}/Assets/`,
                DeleteMultiple: `${API_URL}/Assets/batch-delete`
            }
        },
        Department: {
            GET: {
                AllDepartment: `${API_URL}/Departments`,
                FilterDepartment: `${API_URL}/Departments/filter`
            },
        },
        AssetCategory: {
            GET: {
                AllAssetCategory: `${API_URL}/AssetCategorys/filters`,
                FilterAssetCategory: `${API_URL}/AssetCategorys/filter`
            }
        }
    },
    Method: {
        GET: "GET",
        PUT: "PUT",
        POST: "POST",
        DELETE: "DELETE",
    },
    TextToast: {
        Success: {
            Save: {
                VI: 'Lưu dữ liệu thành công'
            },
            Delete: {
                VI: 'Xóa dữ liệu thành công'
            },
            Update: {
                VI: 'Cập nhật dữ liệu thành công'
            },
            Cancel: {
                VI: 'Hủy tác vụ thành công'
            }
        }
    }

}