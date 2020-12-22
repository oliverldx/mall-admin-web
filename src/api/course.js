import request from '@/utils/request'

let tmpdata = {
      "code": 200,
      "message": "操作成功",
      "data": {
      "pageNum": 1,
      "pageSize": 10,
      "totalPage": 5,
      "total": 50,
      "list": [{"id":1,"TODOtmp1":'tmp1',"TODOtmp2":'tmp2',"TODOtmp3":'tmp3'},
               {"id":2,"TODOtmp1":'tmp12',"TODOtmp2":'tmp22',"TODOtmp3":'tmp32'},
               {"id":3,"TODOtmp1":'tmp13',"TODOtmp2":'tmp23',"TODOtmp3":'tmp33'},
               {"id":4,"TODOtmp1":'tmp14',"TODOtmp2":'tmp24',"TODOtmp3":'tmp34'}
              ]
      }
    }

export function fetchList(params) {
    return new Promise((resolve, reject) => {
        resolve(tmpdata);
    })
  
}

export function del(params) {

      let r = {
        url:'TODO-url-path',
        method:'post',
        params:params
      }
      if(r.url.includes('TODO')) {
        alert('此功能处于TODO状态！');
      }else {
        return request(r)
      }
  
}


