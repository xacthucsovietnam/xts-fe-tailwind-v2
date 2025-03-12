// src/env.d.ts
interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    // Thêm các biến môi trường khác nếu cần, ví dụ:
    // readonly VITE_ANOTHER_VAR: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }