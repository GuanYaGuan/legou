import request from "@/api/request.js"


// 获取收货地址列表
function submitAction(data) {
    return request({
        method: "post",
        url: "/feedback/submitAction",
        data
    })
}
export {
    submitAction,
}