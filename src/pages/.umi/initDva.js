import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'global', ...(require('/Users/edz/Desktop/shoping_admin/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('/Users/edz/Desktop/shoping_admin/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('/Users/edz/Desktop/shoping_admin/src/models/login.js').default) });
app.model({ namespace: 'setting', ...(require('/Users/edz/Desktop/shoping_admin/src/models/setting.js').default) });
app.model({ namespace: 'model', ...(require('/Users/edz/Desktop/shoping_admin/src/pages/Account/model.js').default) });
app.model({ namespace: 'model', ...(require('/Users/edz/Desktop/shoping_admin/src/pages/Products/model.js').default) });
