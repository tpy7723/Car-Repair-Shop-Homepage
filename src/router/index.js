import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Question from '@/components/Question'
import Review from '@/components/Review'
import Reservation from '@/components/Reservation'
import Quest_add from '@/components/Quest_add'
import Login_em from '@/components/Login_em'
import Review_add from '@/components/Review_add'
import Reserv_add from '@/components/Reserv_add'
import Join from '@/components/Join'
import Join_em from '@/components/Join_em'
import Log from '@/components/Log'
import Review_detail from '@/components/Review_detail'
import Receipt from '@/components/Receipt'
import Car_info from '@/components/Car_info'
import Comment from '@/components/Comment'
import Comment_add from '@/components/Comment_add'
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
    },
    {
      path:'/quest_add',
      name:'Quest_add',
      component: Quest_add
    },{
      path:'/login_em',
      name:'Login_em',
      component: Login_em
    },{
      path:'/review_add',
      name:'Review_add',
      component: Review_add
    },{
      path:'/join',
      name:'Join',
      component: Join
    },{
      path:'/join_em',
      name:'Join_em',
      component: Join_em
    },{
      path:'/log',
      name:'Log',
      component: Log
    },{
      path:'/review_detail',
      name:'Review_detail',
      component: Review_detail
    },{
      path:'/receipt',
      name:'Receipt',
      component: Receipt
    },{
      path:'/car_info',
      name:'Car_info',
      component: Car_info
    },{
      path:'/comment',
      name:'Comment',
      component: Comment
    },{
      path:'/comment_add',
      name:'Comment_add',
      component: Comment_add
    }
  ]
})
