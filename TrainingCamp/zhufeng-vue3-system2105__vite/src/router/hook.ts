import { Router } from 'vue-router';

export default (router: Router) => {
  router.beforeEach((to, from, next) => {
    console.log('路由拦截');
    next();
  });
};
