import mockjs from 'mockjs';


let list = [];
for( var i=0; i< 20; i++ ) {
  list.push({
    id: 'pro_id'+i,  
    name: '葡萄酒'+i,
    price: 30*(i+10),
    img: 'http://img10.jiuxian.com/2016/1012/6efb435be39c4867a485b8191da230c12.jpg', 
    unit: 'bottled',
    sales: '100', 
    origin: '',
    class: '酒类',
    desc: Boolean(parseInt(Math.random(0,1))), 
    create_at: new Date(),
    upDate_at: new Date(),
  })
}

export default {
    'GET /api/products': {
        code: '0',
        data: list
    },
}