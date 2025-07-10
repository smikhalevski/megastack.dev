import { CSSProperties } from 'react';

export function lightDarkBackgroundImage(lightSrc: string, darkSrc: string): CSSProperties {
  return {
    '--light-background-image': 'url(' + JSON.stringify(lightSrc) + ')',
    '--dark-background-image': 'url(' + JSON.stringify(darkSrc) + ')',
  };
}
