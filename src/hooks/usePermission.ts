import { useStore } from 'vuex'

export function usePermission(pageName: string, hanldeName: string) {
  const store = useStore()
  const permissions: any[] = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${hanldeName}`

  return !!permissions.find((item) => item === verifyPermission)
}
