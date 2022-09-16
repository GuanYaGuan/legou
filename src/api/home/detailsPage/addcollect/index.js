import request from '@/api/request.js'
// 添加收藏
function addcollect(data) {
    return request({
        method: "post",
        url: "/collect/addcollect",
        data
    })
}
export {
    addcollect
}