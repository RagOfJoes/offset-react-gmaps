/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_MAP_GL_API_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
