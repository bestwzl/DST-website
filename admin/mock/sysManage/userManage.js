import Mock from 'mockjs';

const scatList = (opts) => {
    let response ={
        errCode:'0',
        errMessage:'成功了',
        data:[
            {
                name: '亮亮',
                code: 448449717,
                amount: 73000000,
            }, {
                name: '卷卷',
                code: 781702791,
                amount: 45700000,
            }
        ]
    }
  return response
}




Mock.mock('/mock/testApi', scatList)