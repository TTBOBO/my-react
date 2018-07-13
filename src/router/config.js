import asyncComponents from './asyncComponents';

const _import_views = file => asyncComponents(() => import(`../views/${file}`))

export const loyoutRouterMap = [
    {
        path:"/",
        name:"首页",
        exact:true,
        component:_import_views("home")
    },{
        path:"/video",
        name:"视频",
        exact:true,
        component:_import_views("video")
    },
    {
        path:"/cart",
        name:"购物车",
        exact:true,
        component:_import_views("cart")
    },
    {
        path:"/user",
        name:"我的",
        excat:true,
        component:_import_views("user")
    }
];

export const otherRouterMap = [
    {
        path:"/login",
        name:"登录",
        exact:true,
        component:_import_views("login")
    },{
        path:"/article/:id",
        name:"文章详情",
        component:_import_views("article/article")
    },{
        path:"/videoinfo/:id",
        name:"视频详情",
        component:_import_views("article/video")
    },{
        path:"/timeArticle",
        name:"视频24小时资讯",
        component:_import_views("timeArticle/timeArticle")
    },{
        path:"/searArticle",
        name:"搜索资讯",
        component:_import_views("searArticle/searArticle")
    }
];

export const routes = loyoutRouterMap.concat(otherRouterMap);