import request from "@/api/request.js"


function index(){
    return request({
        method:'get',
        url:'/index/index',
    })
}


export{
    index
}
/*
export default        /// 引入方式 import b from

export{
    a         /// 引入方式  import {a}
}
*/