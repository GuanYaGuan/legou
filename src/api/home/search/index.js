import request from "@/api/request.js"


// 请求关键词和搜索历史页面数据
function  keywords(data){
    return request({
        method:"get",
        url:"/search/indexaction",
        params:data
    })
}
// 搜索提示请求接口
function  searchTip(data){
    return request({
        method:"get",
        url:"/search/helperaction",
        params:data
    })
}
// 添加搜索记录请求接口
function  addHistory(data){
    return request({
        method:"post",
        url:"/search/addhistoryaction",
        params:data
    })
}
// 删除历史记录
function  delHistory(data){
    return request({
        method:"post",
        url:"/search/clearhistoryAction",
        params:data
    })
}
export {
    keywords,
    searchTip,
    addHistory,
    delHistory
}