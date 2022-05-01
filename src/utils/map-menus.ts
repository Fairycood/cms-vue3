import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/components/breadCrumb/src/type'

let firstMenu: any = null

//动态路由的创建
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  const allRoutes: RouteRecordRaw[] = [] //存放所有菜单routes
  //先加载所有的route
  const routerFiles = require.context('../router/main', true, /\.ts/)
  routerFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  //根据传入的userMenus将需要的menu添加到routes
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) {
          routes.push(route)
          if (!firstMenu) {
            firstMenu = menu
          }
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  return routes
}

//根据传入的path输出对应的menu
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMeun = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMeun) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMeun.name })
        return findMeun
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

//获取当前页面对应的面包屑
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

//根据传入的userMenus获取用户的按钮的权限
export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []
  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)

  return permissions
}

//根据传入的menus获取叶子节点的id
export function menuMapLeafKeys(menuList: any[]) {
  const leafKeys: number[] = []
  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leafKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menuList)
  return leafKeys
}

export { firstMenu }
