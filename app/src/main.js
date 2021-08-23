import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import {routes} from './routes'

// styles importation
// bootstrap from node modules
import 'bootstrap/dist/css/bootstrap.css'
// personalized style file
import './assets/css/teste.css'

// JS
import './assets/js/teste.js'
//import 'bootstrap/dist/js/bootstrap.js'


Vue.use(VueResource)

Vue.http.options.root = process.env.API_URL ? process.env.API_URL : 'http://localhost:3000'; // caso esteja em ambiente de produção vai pegar a variável de ambiente 'API_URL'

/* Vue.http.interceptors.push((req, next) => {
  // é possível colocar informações no header antes do envio da requisição
  req.headers.set('Authorization', 'informação de segurança aqui');
  console.log('Lidando com o request');

  next(res => {
    console.log('Lidando com a resposta')
    // é possível acessar os dados da reposta e realizar transformações antes
    console.log(res.body);
  });
}); */

Vue.use(VueRouter)

const router = new VueRouter({ 
  mode: 'history', /* Para não aparecer o # na url */
  routes 
})


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
