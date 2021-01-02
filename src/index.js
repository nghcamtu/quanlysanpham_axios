//global
// function getEle(id){
//     return document.getElementById(id);
// }


//B1- LẤY DATA TỪ SERVER VỀ
function getProductList() {
    /* axios trả về 1 promise
        - xử lý thành công: then, 
        - xử lý thất bại:catch
    */
    // var a = axios({
    //     method: "GET",
    //     url: "https://5fb26e6887ed490016ea8e34.mockapi.io/product",

    // })
    productServices.getProductList()
        .then(function (resp) {
            console.log("respond:", resp);
            var productList = resp.data;
            // console.log("productList nè:", productList);

            //gọi hàm hiển thị dữ liệu của sản phẩm ra màn hình
            renderTable(productList);
        })
        .catch(function (err) {
            console.log("error:", err);
        });
}
getProductList();

//B2- TẠO HÀM HIỂN THỊ DỮ LIỆU RA MÀN HÌNH
function renderTable(productList) {
    var tableContent = "";
    productList.forEach(function (product) {
        tableContent += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>
                    <img src= "${product.image}" alt="" style="width: 50px;">
                </td>
                <td> 
                    <button class="btn btn-danger" onclick="handleDelete(${product.id})">Xóa</button>
                </td>
                <td> 
                <button class="btn btn-warning" onclick="handleEdit(${product.id})">Sửa</button>
            </td>
            </tr>
        
        `;
    });
    document.getElementById("tblDanhSachSanPham").innerHTML = tableContent;


}
//B3- CHỨC NĂNG THÊM SẢN PHẨM
document.getElementById("btnThem").addEventListener("click", function () {
    console.log("nút thêm chạy");

    //lấy giá trị người dùng nhập vào
    var name = document.getElementById("tenSP").value;
    var price = document.getElementById("gia").value;
    var image = document.getElementById("hinhAnh").value;
    //tạo đối tượng sản phẩm
    var newProduct = new Product(null, name, price, image);
    //tương tác với server để đẩy các sản phẩm lên, nên cần axios
    // axios({ //AXIOS CÓ 2 PROPERTY MẶC ĐỊNH PHẢI CÓ LÀ METHOD VÀ URL
    //     method: "post",
    //     url: "https://5fb26e6887ed490016ea8e34.mockapi.io/product",
    //     data: newProduct, //đẩy nội dung thay đổi lên, ko có là không chạy

    // })
    productServices.createProduct(newProduct)
        .then(function (resp) {
            console.log("respond lúc post nè:", resp);
            getProductList();
        })
        .catch(function (err) {
            console.log("lỗi:", err);
        });

});

//B4- CHỨC NĂNG XÓA SẢN PHẨM
function handleDelete(id) {
    console.log(id);
    //tương tác với sản phẩm từ server để xóa, nên cần axios
    /*axios({
        method: "DELETE",
        // url: "https://5fb26e6887ed490016ea8e34.mockapi.io/product" +id,
        url: `https://5fb26e6887ed490016ea8e34.mockapi.io/product/${id}`,
    }) */
    productServices.deleteProduct(id)
        .then(function (resp) {
            console.log("respond lúc xóa nè:", resp);
            getProductList();
        })
        .catch(function (err) {
            console.log("lỗi:", err);
        });
}

//B5- CHỨC NĂNG SỬA SẢN PHẨM
function handleEdit(id) {
    console.log(id);
    //tương tác với sản phẩm từ server để sửa, nên cần axios
    /*axios({
        method: "GET",
        url: `https://5fb26e6887ed490016ea8e34.mockapi.io/product/${id}`,
    }) */
    productServices.getProductDetail(id)
        .then(function (resp) {
            console.log("respond lúc sửa nè:", resp);
            //hiển thị thông tin chi tiết của sản phẩm được click sửa lên ô input
            var productDetail = resp.data;
            document.getElementById("maSP").value = productDetail.id;
            document.getElementById("tenSP").value = productDetail.name;
            document.getElementById("gia").value = productDetail.price;
            document.getElementById("hinhAnh").value = productDetail.image;
        })
        .catch(function (err) {
            console.log("lỗi:", err);
        });
}

document.getElementById("btnCapNhat").addEventListener("click", function () {
    //lấy giá trị người dùng nhập vào
    var id= document.getElementById("maSP").value;
    var name = document.getElementById("tenSP").value;
    var price = document.getElementById("gia").value;
    var image = document.getElementById("hinhAnh").value;
    //tạo đối tượng sản phẩm
    var newProduct = new Product(id, name, price, image);
    
    //tương tác với api để cập nhật product
    /*axios({
        method: "PUT", //MẤY CÁI VALUE CỦA METHOD PROPERTY NÀY TÙY THUỘC VÀO API NÓ GHI, NÊN PHẢI CHECK DOC
        url: `https://5fb26e6887ed490016ea8e34.mockapi.io/product/${id}`,
        data: newProduct
    })*/
    productServices.updateProduct(id, newProduct)
    .then(function (resp) {
        console.log("respond lúc cập nhật nè:", resp);
        getProductList();
    })
    .catch(function (err) {
        console.log("lỗi:", err);
    });

});
