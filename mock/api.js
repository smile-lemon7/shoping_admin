import mockjs from 'mockjs';


let list = [];
for( var i=0; i< 20; i++ ) {
  list.push({
    id: 'pro_id'+i,  
    name: '葡萄酒'+i,
    product_img: 'http://img10.jiuxian.com/2016/1012/6efb435be39c4867a485b8191da230c12.jpg', 
    content: '整箱红酒7°通天柔红山葡萄甜酒750ml（6瓶装）',
    price: 30*(i+10),
    product_type: '酒类',
    unit: 'bottled',
    stocks: '20',
    sale: '100', 
    shelf: Boolean(parseInt(Math.random(0,1))), 
  })
}

export default {
    'GET /api/products': {
        code: '201',
        data: list
    },
}