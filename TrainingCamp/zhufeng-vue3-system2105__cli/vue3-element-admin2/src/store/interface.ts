import { Size } from '@/plugins/element'
import { IRoleState } from './modules/role'
import { RouteLocationNormalizedLoaded, RouteRecordName } from 'vue-router'

export interface AppStateTypes {
  sidebar: {
    opened: boolean
  },
  size: Size
}

export interface TagsViewState {
  // 存放当前显示的tags view集合
  visitedViews: RouteLocationNormalizedLoaded[];
  // 根据路由name缓存集合
  cachedViews: RouteRecordName[];
}

export interface SettingsState {
  theme: string;
  tagsView: boolean;
  sidebarLogo: boolean;
  originalStyle: string;
}

// 定义state类型

export interface Role {
  id: number;
  name: string;
  description: string;
}
export interface Profile {
  avatar: string;
  email: string;
  id: number;
  isSuper: boolean;
  mobile: string;
  status: boolean;
  username: string;
  description: string;
  roles: Role[];
  roleIds?: number[]
}
export interface IUserState {
  token: string | null;
  userInfo: Profile | null;
  users: Profile[];
  count: number;
  roles: Role[] | null
}

export interface RootStateTypes {
  app: AppStateTypes,
  tagsView: TagsViewState,
  settings: SettingsState,
  user: IUserState;
  role: IRoleState;
}

// export interface AllStateTypes extends RootStateTypes {
//   user: UserStateTypes,
//   test: TestStateTypes,
// app: AppStateTypes
// }
