import request from "@/api/request.js"


// 获取导航数据
function  categoryNav(data){
    return request({
        method:"get",
        url:"/category/categoryNav",
        params:data
    })
}
// 获取对应导航下 商品列表数据
function  goodsList(data){
    return request({
        method:"get",
        url:"/goods/goodsList",
        params:data
    })
}
export {
    categoryNav,
    goodsList
}