// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'POST /api/admin': (req, res) => {
    const { password, userName } = req.body;
    if (password === 'admin' && userName === 'admin') {
      res.send(
        {
          code: '201',
          data: {
            id: "userid1",
            account: 'admin',
            password: 'admin',
            avatar: '',
            authority: ['superAdmin']
          }
        });
    } else if (userName !== 'admin') {
      res.status(400).send({
        message: '用户名错误',
      });
    } else if (password !== 'admin') {
      res.status(406).send({
        message: '密码错误',
      });
    }
  },

}