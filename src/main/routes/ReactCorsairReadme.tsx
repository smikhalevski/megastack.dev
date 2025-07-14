import React from 'react';
import readme from '../gen/react-corsair-readme';
import reactCorsairLogoDarkSrc from '../assets/react-corsair-logo-dark.png';
import reactCorsairLogoLightSrc from '../assets/react-corsair-logo-light.png';
import { Readme } from '../components/readme/Readme';
import { lightDarkBackgroundImage } from '../components/utils';

export default function ReactCorsairReadme() {
  return (
    <Readme
      logo={
        <div
          style={{
            ...lightDarkBackgroundImage(reactCorsairLogoLightSrc, reactCorsairLogoDarkSrc),
            aspectRatio: 830 / 470,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            maxWidth: '100%',
            width: '20rem',
          }}
          title={'React Corsair'}
        />
      }
      readme={readme}
    />
  );
}
