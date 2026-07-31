import FavoritesView from '@/home/views/FavoritesView.vue';
import HomeView from '@/home/views/HomeView.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { title: 'Pokédex Global66 | Lista' },
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: FavoritesView,
    meta: { title: 'Pokédex Global66 | Mis Favoritos' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  },
});

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
});

export default router;
