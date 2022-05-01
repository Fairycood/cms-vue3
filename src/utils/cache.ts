class LocalCache {
  //设置本地数据
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  //获取本地数据
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  //删除
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }
  //清空
  clearCache() {
    window.localStorage.clear()
  }
}
export default new LocalCache()
