import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Question from '@/components/Question'
import Review from '@/components/Review'
import Reservation from '@/components/Reservation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/login',
      name:'Login',
      component: Login
    },
    {
      path:'/question',
      name:'Question',
      component: Question
    },
    {
      path:'/review',
      name:'Review',
      component: Review
    },
    {
      path:'/reservation',
      name:'Reservation',
      component: Reservation
    }
  ]
})
