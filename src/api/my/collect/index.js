import request from "@/api/request.js"


// 获取收货地址列表
function collectlistAction(data) {
    return request({
        method: "get",
        url: "/collect/listAction",
        params: data
    })
}
export {
    collectlistAction,
}