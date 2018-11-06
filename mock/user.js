// 代码中会兼容本地 service mock 以及部署站点的静态数据

let list = [];
for( var i=0; i< 10; i++ ) {
  list.push({
    id: 'user_id'+i,
    account: 'krystal'+i,
    password: 'krystal'+i,
    authority: ['admin']
  })
}

export default {
  'POST /api/admin': (req, res) => {
    const { password, userName } = req.body;
    if (password === 'superAdmin' && userName === 'superAdmin') {
      res.status(201).send({
        code: '1',
        data: {
          id: 'user_id1',
          account: 'superAdmin',
          password: 'superAdmin',
          authority: ['superAdmin','admin']
        }
      });
    } else if (userName !== 'superAdmin') {
      res.status(400).send({
        message: '用户名错误',
      });
    } else if (password !== 'superAdmin') {
      res.status(406).send({
        message: '密码错误',
      });
    }
  },

  'GET /api/admin': {
    code: '201',
    data: list
  },

  'POST /api/postAccount': {
    code: '1',
    data: {
      message: 'add ok'
    }
  },

  'POST /api/updateAccount': {
    code: '1',
    data: {
      message: 'update ok'
    }
  },
  
  'GET /api/admin/*': {
    code: '1',
    data: {
      id: 'user_id*',
      account: 'carrie',
      password: 'carrie',
    }
  }

  
};
