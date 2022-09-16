import request from "@/api/request.js"


// 添加购物车
function addCart(data) {
    return request({
        method: "post",
        url: "/cart/addCart",
        data
    })
}
// 购物车列表
function cartList(data) {
    return request({
        method: "get",
        url: "/cart/cartList",
        params:data
    })
}
// 删除
function deleteAction(data) {
    return request({
        method: "get",
        url: "/cart/deleteAction",
        params:data
    })
}
export {
    addCart,
    cartList,
    deleteAction
}