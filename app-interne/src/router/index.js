import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/tortue/:id',
    name: 'VoirTortue',
    component: () => import('../views/TurtlePage.vue'),
    children: [
      {
        path : 'suivi',
        name: 'VoirTortueSuivi',
        component: () => import('../views/TurtleTab/Suivi.vue')
      },
      {
        path : 'detail',
        name: 'VoirTortueDetail',
        component: () => import('../views/TurtleTab/Detail.vue')
      },
      {
        path : 'aide',
        name: 'VoirTortueAide',
        component: () => import('../views/TurtleTab/Aide.vue')
      }
    ]
  },
  {
    path: '/ajouter/donnee/:id',
    name: 'AjouterDonnee',
    component: () => import('../views/Donnee.vue')
  },
  {
    path: '/administration',
    name: 'Administration',
    component: () => import('../views/Administration/Administration.vue'),
    children: [
      {
        path: 'nourritures',
        name: 'NourrituresAdmin',
        component: () => import('../views/Administration/Nourritures.vue'),
      },
      {
        path: 'tortues',
        name: 'TortuesAdmin',
        component: () => import('../views/Administration/Tortues.vue'),
      },
      {
        path: 'nourritures/ajouter',
        name: 'AjouterNourriture',
        component: () => import('../components/forms/NourritureForm.vue')
      },
      {
        path: 'nourritures/modifier/:id',
        name: 'ModifierNourriture',
        component: () => import('../components/forms/NourritureForm.vue')
      }
    ]
  },  
  {
    path: 'tortues/ajouter',
    name: 'AjouterTortue',
    component: () => import('../components/forms/TortueForm.vue')
  },
  {
    path: 'tortues/modifier/:id',
    name: 'ModifierTortue',
    component: () => import('../components/forms/TortueForm.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
