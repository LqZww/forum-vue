import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'
// import { Header } from 'element-ui'

const PostList = () => import('../components/content/PostList')
const Article = () => import('../components/content/Article')
const Info = () => import('../components/content/Info')
const MessageWall = () => import('../components/content/MessageWall')
const Music = () => import('../components/content/Music')
const Writing = () => import('../components/content/Writing')
const Criticism = () => import('../components/content/Criticism')
const CreateArticle = () => import('../components/content/CreateArticle')
const Header = () => import('../components/head/Header')
const Sponsor = () => import('../components/sidebar/Sponsor')
const Sidebar = () => import('../components/sidebar/Sidebar')
const FriendlyLink = () => import('../components/sidebar/FriendlyLink')
const FriendlyCommunity = () => import('../components/sidebar/FriendlyCommunity')

const Signin = () => import('../components/login/Signin')
const Register = () => import('../components/login/Register')
const InforSidebar = () => import('../components/sidebar/InforSidebar')
const Front = () => import('../components/list/Front')
const ChangeArticle = () => import('../components/content/ChangeArticle')
const ArticleManage = () => import('../components/admin/ArticleManage')
const AHeader = () => import('../components/admin/AHeader')
const ASignin = () => import('../components/admin/ASignin')
const UserManage = () => import('../components/admin/UserManage')
const SortManage = () => import('../components/admin/SortManage')

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/',
    components: {
      header: Header,
      main: PostList,
      slidebar1: Sidebar,
      slidebar2: FriendlyLink,
      slidebar3: FriendlyCommunity,
      slidebar4: Sponsor
    },
  },
  {
    name: 'post_content',
    path: '/fid=:fid',
    components: {
      header: Header,
      main: Article,
      criticism: Criticism,
      slidebar1: InforSidebar,
      slidebar2: FriendlyLink
    }
  },
  {
    name: 'Writing',
    path: '/writing',
    components: {
      header: Header,
      main: Writing,
      slidebar1: FriendlyLink
    },
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    }
  },
  {
    name: 'Signin',
    path: '/signin',
    components: {
      header: Header,
      main: Signin,
      slidebar1: Sidebar,
      slidebar2: FriendlyLink
    }
  },
  {
    name: 'Register',
    path: '/register',
    components: {
      header: Header,
      main: Register,
      slidebar1: Sidebar,
      slidebar2: FriendlyLink
    }
  },
  {
    name: 'Music',
    path: '/music',
    components: {
      header: Header,
      main: Music,
      slidebar1: Sidebar,
      slidebar2: FriendlyLink

    }
  },
  {
    name: 'MessageWall',
    path: '/messagewall',
    components: {
      header: Header,
      main: MessageWall,
      slidebar1: Sidebar,
      slidebar2: FriendlyLink
    }

  },
  {
    name: 'Info',
    path: '/info',
    components: {
      header: Header,
      main: Info,
      criticism: CreateArticle,
      slidebar1: Sidebar,
      slidebar2: FriendlyLink

    },
    meta: {
      requireAuth: true
    }
  },
  // {
  //   name: 'post_info',
  //   path: '/info/userid=:userid',
  //   components: {
  //     main: Info,
  //     criticism: Criticism,
  //     slidebar1: InforSidebar,
  //     slidebar2: FriendlyLink
  //   }
  // },
  {
    name: 'sort',
    path: '/sort?bid=:bid',
    components: {
      header: Header,
      main: Front,
      slidebar1: Sidebar,
      slidebar2: FriendlyLink
    }
  },
  {
    name: 'change_article',
    path: '/refid=:fid',
    components: {
      header: Header,
      main: ChangeArticle,
      slidebar1: Sidebar,
      slidebar2: FriendlyLink
    }
  },

  {
    name: 'adminsignin',
    path: '/admin/signin',
    components: {
      header: AHeader,
      adminuser: ASignin
    }
  },
  {
    name: 'admin',
    path: '/admin',
    components: {
      header: AHeader,
      adminuser: UserManage
    },
    meta: {
      requireAuthAdmin: true // 添加该字段，表示进入这个路由是需要登录的
    }
  },
  {
    name: 'adminuser',
    path: '/admin/user',
    components: {
      header: AHeader,
      adminuser: UserManage
    },
    meta: {
      requireAuthAdmin: true
    }
  },
  {
    name: 'adminsort',
    path: '/admin/sort',
    components: {
      header: AHeader,
      adminuser: SortManage
    },
    meta: {
      requireAuthAdmin: true
    }
  },
  {
    name: 'adminart',
    path: '/admin/article',
    components: {
      header: AHeader,
      adminuser: ArticleManage
    },
    meta: {
      requireAuthAdmin: true
    }
  },

]

const router = new VueRouter({
  routes,
  mode: 'history'
})


router.beforeEach((to, from, next) => {
  if (to.meta.requireAuthAdmin) {  // 判断该路由是否需要登录权限
    if (store.state.acookie) {  // 通过vuex state获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/admin/signin',
      })
    }
  }
  else {
    next();

  }
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.cookie) {  // 通过vuex state获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/signin',
      })
    }
  }
  else {
    next();
  }
})


export default router