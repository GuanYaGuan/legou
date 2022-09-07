import request from "@/api/request.js"


// 请求关键词和搜索历史页面数据
function  keywords(data){
    return request({
        method:"get",
        url:"/search/indexaction",
        params:data
    })
}

export {
    keywords,
}