import request from "@/api/request.js"


// 请求专题页面数据
function  topic(data){
    return request({
        method:"get",
        url:"/topic/listaction",
        params:data
    })
}
// 请求分类详情页数据
function  topicDetail(data){
    return request({
        method:"get",
        url:"/topic/detailaction",
        params:data
    })
}
export {
    topic,
    topicDetail
}