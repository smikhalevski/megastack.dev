import React from 'react';
import readme from '../gen/roqueform-readme.js';
import roqueformLogoDarkSrc from '../assets/roqueform-logo-dark.png';
import roqueformLogoLightSrc from '../assets/roqueform-logo-light.png';
import { Readme } from '../components/readme/Readme.js';
import { lightDarkBackgroundImage } from '../components/utils.js';

export default function RoqueformReadme() {
  return (
    <Readme
      logo={
        <div
          style={{
            ...lightDarkBackgroundImage(roqueformLogoLightSrc, roqueformLogoDarkSrc),
            aspectRatio: 1500 / 270,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            maxWidth: '100%',
            maxHeight: '100%',
            width: '20rem',
          }}
          title={'Roqueform'}
        />
      }
      readme={readme}
    />
  );
}
