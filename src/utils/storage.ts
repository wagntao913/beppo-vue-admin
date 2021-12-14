/**
 * @description storage 二次封装
 */
const nameSpaced = import.meta.env.VITE_NAME_SPACE

export default {
  getStorage() {
    return JSON.parse(window.localStorage.getItem(nameSpaced) || '{}')
  },
  setItem(key: string | number, val: any) {
    const storage = this.getStorage()
    storage[key] = val
    window.localStorage.setItem(nameSpaced, JSON.stringify(storage))
  },
  getItem(key: string | number) {
    const storage = this.getStorage()
    return storage[key]
  },
  clearItem(key: string | number) {
    const storage = this.getStorage()
    delete storage[key]
    window.localStorage.setItem(nameSpaced, JSON.stringify(storage))
  },
  clearAll() {
    window.localStorage.clear()
  }
}
