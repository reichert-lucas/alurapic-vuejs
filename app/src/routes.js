const Cadastro = () => System.import('./components/cadastro/Cadastro.vue'); // assim só vai carregar o compoenente de cadastro quando ele fot utilizado (lazy loading)
//import Cadastro from './components/cadastro/Cadastro.vue'
import Home from './components/home/Home.vue'

export const routes = [
    {path: '', name: 'home', component: Home, titulo: 'Home', menu: true}, // path é o caminho do componente (url), quando fica em branco é o mesmo que localhost:3000/#/
    {path: '/cadastro', name: 'cadastro', component: Cadastro, titulo: 'Cadastro', menu: true},
    {path: '/cadastro/:id', name: 'altera', component: Cadastro, titulo: 'Cadastro', menu: false},
    {path: '*', component: Home, menu: false}
]