import request from "@/api/request.js"


function index() {
    return request({
        method: 'get',
        url: '/bufan/topic/listaction',
    })
}


export {
    index
}