import DashboardLayout from '@/dashboard/layout/DashboardLayout.vue';
import ProfileView from '@/dashboard/views/ProfileView.vue';
import RegionsView from '@/dashboard/views/RegionsView.vue';
import FavoritesView from '@/home/views/FavoritesView.vue';
import HomeView from '@/home/views/HomeView.vue';
import PokemonDetailView from '@/pokemon/views/PokemonDetailView.vue';
import OnboardingView from '@/onboarding/views/OnboardingView.vue';
import { useOnboardingStore } from '@/onboarding/store/onboarding.store';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Onboarding',
    component: OnboardingView,
    meta: { title: 'Bienvenido | Pokédex Global66' },
  },
  {
    path: '/onboarding',
    redirect: '/',
  },
  {
    path: '/welcome',
    redirect: '/',
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    redirect: '/pokedex',
    children: [
      {
        path: '/pokedex',
        name: 'Home',
        component: HomeView,
        meta: { title: 'Pokédex Global66 | Lista' },
      },
      {
        path: '/pokemon/:id',
        name: 'PokemonDetail',
        component: PokemonDetailView,
        meta: { title: 'Pokédex Global66 | Detalle Pokémon' },
      },
      {
        path: '/regions',
        name: 'Regions',
        component: RegionsView,
        meta: { title: 'Pokédex Global66 | Regiones' },
      },
      {
        path: '/favorites',
        name: 'Favorites',
        component: FavoritesView,
        meta: { title: 'Pokédex Global66 | Mis Favoritos' },
      },
      {
        path: '/profile',
        name: 'Profile',
        component: ProfileView,
        meta: { title: 'Pokédex Global66 | Mi Perfil' },
      },
    ],
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

router.beforeEach((to, _from, next) => {
  const onboardingStore = useOnboardingStore();

  if (
    !onboardingStore.hasCompletedOnboarding &&
    to.path !== '/' &&
    to.path !== '/onboarding' &&
    to.path !== '/welcome'
  ) {
    next('/');
  } else {
    next();
  }
});

router.afterEach(to => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
});

export default router;