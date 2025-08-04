/// <reference types="vite/client" />

interface ImageMetadata {
  src: string;
  width: number;
  height: number;
  format: string;
}

declare module '*as=metadata' {
  const metadata: ImageMetadata;
  export default metadata;
}
