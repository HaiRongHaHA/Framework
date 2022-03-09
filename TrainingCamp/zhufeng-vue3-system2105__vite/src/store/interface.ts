export interface UserStateTypes {
  name: string,
  phone: number
}
export interface TestStateTypes {
  mid: number
}

export interface RootStateTypes {
  token: string
}

export interface AllStateTypes extends RootStateTypes {
  user: UserStateTypes,
  test: TestStateTypes
}
