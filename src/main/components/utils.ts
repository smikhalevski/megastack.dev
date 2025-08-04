import { CSSProperties } from 'react';

export function lightDarkImage(light: ImageMetadata | string, dark: ImageMetadata | string): CSSProperties {
  return {
    '--image-light': `url(${typeof light === 'string' ? light : JSON.stringify(light.src)})`,
    '--image-dark': `url(${typeof dark === 'string' ? dark : JSON.stringify(dark.src)})`,
    aspectRatio: typeof light === 'string' ? undefined : light.width / light.height,
  };
}
