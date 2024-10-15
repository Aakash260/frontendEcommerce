// / <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_FIREBASE_KEY: string;
    readonly VITE_AUTHDOMAIN:string;
    readonly VITE_PROJECTID:string;
    readonly VITE_STORAGE:string;
    readonly VITE_MESSAGE:string;
    readonly VITE_APP:string;
    readonly VITE_SERVER:string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }