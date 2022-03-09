import { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layout')

// 基础路由
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard'),
        meta: {
          affix: true,
          title: 'Dashboard',
          icon: 'el-icon-picture-outline-round'
        }
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    children: [
      { // 带参数的动态路由正则匹配 文档说明
        // https://next.router.vuejs.org/zh/guide/essentials/route-matching-syntax.html#%E5%8F%AF%E9%87%8D%E5%A4%8D%E7%9A%84%E5%8F%82%E6%95%B0
        path: '/redirect/:path(.*)', // 要匹配多级路由 应该加*号
        component: () => import('@/views/Redirect'),
        meta: {
          hidden: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/401',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/ErrorPage/401'),
        meta: {
          title: '401',
          icon: '404',
          hidden: true
        }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/ErrorPage/404'),
    meta: {
      hidden: true // 404 hidden掉
    }
  }
]

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
          affix: true,
          noCache: true,
          title: 'Documentation',
          icon: 'documentation'
        }
      }
    ]
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
          hidden: false,
          activeMenu: '/system/user'
        }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    children: [
      {
        path: 'index',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "guide" */ '@/views/Profile'),
        meta: {
          title: 'profile',
          icon: 'el-icon-s-tools',
          hidden: true
        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    meta: {
      title: 'System',
      icon: 'lock',
      alwaysShow: true
    },
    children: [
      {
        path: 'menu',
        name: 'Menu',
        component: () => import(/* webpackChunkName: "menu" */ '@/views/System/Menu'),
        meta: {
          title: 'Menu Management',
          icon: 'list'
        }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import(/* webpackChunkName: "role" */ '@/views/System/Role'),
        meta: {
          title: 'Role Management',
          icon: 'list',
          hidden: false
        }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "user" */ '@/views/System/User'),
        meta: {
          title: 'User Management',
          icon: 'list'
        }
      }
    ]
  },
  {
    path: '/external-link',
    component: Layout, // 布局组件作为一级路由
    children: [
      {
        path: 'https://www.baidu.com/',
        redirect: '/',
        meta: {
          title: 'External Link',
          icon: 'link'
        }
      }
    ]
  }
]

export default [
  ...constantRoutes,
  ...asyncRoutes
]

// routes: Array<RouteRecordRaw> =
