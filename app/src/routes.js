import Cadastro from './components/cadastro/Cadastro.vue'
import Home from './components/home/Home.vue'


export const routes = [
    {path: '', component: Home, titulo: 'Home'}, // path é o caminho do componente (url), quando fica em branco é o mesmo que localhost:3000/#/
    {path: '/cadastro', component: Cadastro, titulo: 'Cadastro'},
]