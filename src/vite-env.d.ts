/// <reference types="vite/client" />

interface ImportMetaGlob {
    [key: string]: string;
}

interface ImportMeta {
    glob(
        pattern: string,
        options?: {
            eager?: boolean;
            as?: string;
        }
    ): Promise<ImportMetaGlob> | ImportMetaGlob;
} 