import VueRouter from 'vue-router';
import Home from './components/Home/Home';
import Table from './components/Table/Table';
import NotFound from './components/NotFound/NotFound';

export default new VueRouter({
    routes: [
        {path: '/', component: Home},
        {path: '/table', component: Table},
        {path: '*', component: NotFound},
    ],
    mode: 'history'
});