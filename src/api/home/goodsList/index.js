import request from '@/api/request.js'

// 请求新品首发和热卖商品数据
function isNewHot(data){
    return request({
        methods:'get',
        url:'/goods/goodsList',
        params:data
    })
}
export {
    isNewHot
}