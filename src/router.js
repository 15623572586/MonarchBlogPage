import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import store from '@/store.js'
import axios from '@/axiosConfig.js'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },    
    {
      path: '/home',
      name: 'home',
      component: Home
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})

router.beforeEach(function (to, from, next) {
  var hasLogin = false;
  var userId;
  if(document.cookie){ //首先检查当前浏览器有没有登录过账号
    var cookies = document.cookie.split(";");
    if(cookies.length>0){
      for(var i=0;i<cookies.length;i++){
        var cookie = cookies[i].split(":");
        var key = cookie[0];
        var value = cookie[1];
        if(key=="userId"){    //登录过
          userId = value;
          hasLogin = true;
          break;
        }
      }
    }
  }
  if(hasLogin){ //当前浏览器已经登录
    if(to.path=="/login"){
      next({path:"/home"})
    }else if(to.path=="/home"){
      next();
      var userIdData = {
        userId: userId,
      }
      axios("GET","/getOneUserInfo",userIdData)
      .then(result=>{
        if(result.data.error==null){
          var userInfo = {
            userId : result.data.userId,
            userName: result.data.userName,
          }
          store.commit("setUserStatus",userInfo);
        }
      })
      .catch(error=>{
        console.log(error);
        next("/login")
      })
    }
  }else{  //没有登录，返回登录页面
    if(to.path=="/login"){
      next();
    }else if(to.path=="/home"){
      next("/login")
    }
  }
})

export default router