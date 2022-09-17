import request from "@/api/request.js"


// 订单确认界面数据获取
function orderdetailAction(data) {
    return request({
        method: "get",
        url: "/order/detailAction",
        params:data
    })
}
// 购物车列表
function ordersubmitAction(data) {
    return request({
        method: "post",
        url: "/order/submitAction",
        data:data
    })
}

export {
    orderdetailAction,
    ordersubmitAction
}