import request from '@/api/request.js'

// 请求首页品牌制造商直供的详情数据
function goodsDetails(data) {
    return request({
        methods: 'get',
        url: '/goods/detailaction',
        params: data
    })
}

export {
    goodsDetails
}