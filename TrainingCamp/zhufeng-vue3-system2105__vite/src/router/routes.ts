import { RouteRecordRaw } from 'vue-router';

const Layout = () => import('@/layout');

// 异步路由
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/documentation',
    component: Layout, // 布局组件作为一级路由
    redirect: '/documentation/index',
    children: [
      {
        path: 'index',
        name: 'Documentation',
        component: () => import(/* webpackChunkName: "documentation" */ '@/views/Documentation'),
        meta: {
          title: 'Documentation',
          icon: 'documentation',
        },
      },
    ],
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        name: 'Guide',
        component: () => import(/* webpackChunkName: "guide" */ '@/views/Guide'),
        meta: {
          title: 'Guide',
          icon: 'guide',
        },
      },
    ],
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    meta: {
      title: 'System',
      icon: 'lock',
    },
    children: [
      {
        path: 'menu',
        component: () => import(/* webpackChunkName: "menu" */ '@/views/System/SystemMenu'),
        meta: {
          title: 'Menu Management',
          icon: 'list',
        },
      },
      {
        path: 'role',
        component: () => import(/* webpackChunkName: "role" */ '@/views/System/SystemRole'),
        meta: {
          title: 'Role Management',
          icon: 'list',
        },
      },
      {
        path: 'user',
        component: () => import(/* webpackChunkName: "user" */ '@/views/System/SystemUser'),
        meta: {
          title: 'User Management',
          icon: 'list',
        },
      },
    ],
  },
];

// 基础路由
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/layout'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard'),
        meta: {
          title: 'Dashboard',
        },
      },
    ],
  },
];

export default [
  ...constantRoutes,
  ...asyncRoutes,
];

// routes: Array<RouteRecordRaw> =
