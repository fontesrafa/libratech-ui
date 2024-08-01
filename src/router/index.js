import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LivroListView from '../views/LivroListView.vue';
import LivroDetalhes from '../components/LivroDetalhes.vue';
import CadastrarView from '../views/CadastrarView.vue';
import CadastrarUsuarioView from '../views/CadastrarUsuarioView.vue';
import CadastrarAutorView from '../views/CadastrarAutorView.vue';
import CadastrarCategoriaView from '../views/CadastrarCategoriaView.vue';
import CadastrarEditoraView from '../views/CadastrarEditoraView.vue';
import CadastrarLivroView from '../views/CadastrarLivroView.vue';
import LoginView from '../views/LoginView.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/livro/:id',
    name: 'livro-detalhes',
    component: LivroDetalhes,
    props: true
  },
  {
    path: '/livro/search',
    name: 'livro-search',
    component: LivroListView,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/livro/register',
    name: 'CadastrarLivro',
    component: CadastrarLivroView,
    meta: { requiresAuth: true }
  },
  {
    path: '/cadastrar',
    name: 'Cadastrar',
    component: CadastrarView,
    meta: { requiresAuth: true }
    
  },
  {
    path: '/usuario/register',
    name: 'CadastrarUsuario',
    component: CadastrarUsuarioView,
    meta: { requiresAuth: true }
  },
  {
    path: '/autor/register',
    name: 'CadastrarAutor',
    component: CadastrarAutorView,
    meta: { requiresAuth: true }
  },
  {
    path: '/categoria/register',
    name: 'CadastrarCategoria',
    component: CadastrarCategoriaView,
    meta: { requiresAuth: true }
  },
  {
    path: '/editora/register',
    name: 'CadastrarEditora',
    component: CadastrarEditoraView,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, _, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = localStorage.getItem('jwt');

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
