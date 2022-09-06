import request from "@/api/request.js"


// 请求专题页面数据
function  topic(data){
    return request({
        method:"get",
        url:"/topic/listaction",
        data
    })
}

export {
    topic,
}