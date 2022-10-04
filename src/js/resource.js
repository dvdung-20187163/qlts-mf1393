export default {
    ErrorValidate: {
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
        AssetCategoryCOde: {
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
                AllAsset: "https://localhost:7143/api/v1/Assets",
                AssetById: "https://localhost:7143/api/v1/Assets/",
                MaxCode: "https://localhost:7143/api/v1/Assets/get-max-code",
                FilterAsset: "https://localhost:7143/api/v1/Assets/filter?",
            },
            POST: {
                InsertOne: "https://localhost:7143/api/v1/Assets",
            },
            PUT: {
                UpdateOne: "https://localhost:7143/api/v1/Assets/",
            },
            DELETE: {
                DeleteOne: "https://localhost:7143/api/v1/Assets/",
                DeleteMultiple: ""
            }
        },
        Department: {
            GET: {
                AllDepartment: "https://localhost:7143/api/v1/Departments",
            },
        },
        AssetCategory: {
            GET: {
                AllAssetCategory: "https://localhost:7143/api/v1/AssetCategorys"
            }
        }
    },
    Method: {
        GET: "GET",
        PUT: "PUT",
        POST: "POST",
        DELETE: "DELETE",
    }

}