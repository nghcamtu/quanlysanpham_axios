//services folder: chứa các file tương tác với API
function ProductServices() {
    //tạo property:
    this.baseURL = "https://5fb26e6887ed490016ea8e34.mockapi.io/";
    //tạo các phương thức gọi API
    this.getProductList = function () {
        return axios({
            method: "GET",
            url: `${this.baseURL}product`
        })
    };
    this.createProduct = function (newProduct) {
        return axios({ //AXIOS CÓ 2 PROPERTY MẶC ĐỊNH PHẢI CÓ LÀ METHOD VÀ URL
            method: "post",
            url: `${this.baseURL}product`,
            data: newProduct, //đẩy nội dung thay đổi lên, ko có là không chạy
        })
    };
    this.getProductDetail = function (id) {
        return axios({
            method: "GET",
            url: `${this.baseURL}product/${id}`
        })

    };
    this.deleteProduct = function (id) {
        return axios({
            method: "DELETE",
            // url: "https://5fb26e6887ed490016ea8e34.mockapi.io/product" +id,
            url: `${this.baseURL}product/${id}`
        })
    };
    this.updateProduct = function (id, newProduct) {
        return axios({
            method: "PUT", //MẤY CÁI VALUE CỦA METHOD PROPERTY NÀY TÙY THUỘC VÀO API NÓ GHI, NÊN PHẢI CHECK DOC
            url: `${this.baseURL}product/${id}`,
            data: newProduct
        });
    }
}
var productServices = new ProductServices();
