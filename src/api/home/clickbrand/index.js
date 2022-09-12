import request from '@/api/request.js'

// 请求首页品牌制造商直供的详情数据
function detailaction(data){
    return request({
        methods:'get',
        url:'/brand/detailaction',
        params:data
    })
}
// 请求首页品牌制造商直供的详情内的列表数据
// function listaction(data){
//     return request({
//         methods:'get',
//         url:'/brand/listaction',
//         params:data
//     })
// }

export {
    detailaction,
    // listaction
}