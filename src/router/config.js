import asyncComponents from './asyncComponents';

const _import_views = file => asyncComponents(() => import(`../views/${file}`))

export const loyoutRouterMap = [
    {
        path:"/",
        name:"首页",
        exact:true,
        component:_import_views("home")
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

export const otherRouterMap = [];

export const routes = loyoutRouterMap.concat(otherRouterMap);