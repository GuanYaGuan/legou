import request from "@/api/request.js"


// 请求的是通过分类的id来查询分类列表数据
function currentaction(data){
    return request({
        method:'get',
        url:'/category/currentaction',
        params:data
    })
}
// 请求的是分类导航
function indexaction(){
    return request({
        method:'get',
        url:'/category/indexaction',
    })
}
export{
    currentaction,
    indexaction
}