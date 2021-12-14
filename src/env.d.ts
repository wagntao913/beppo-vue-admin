/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_APP_TITLE: string
  readonly VITE_OUT_DIR: string
  readonly VITE_NAME_SPACE: string
  readonly VITE_BASE_PORT: number
  readonly VITE_BASE_API: string
  readonly VITE_APP_BASE_URL: string
  readonly VITE_USE_MOCK: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
