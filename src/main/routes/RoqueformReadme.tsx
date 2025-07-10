import React from 'react';
import readme from '../gen/roqueform-readme';
import roqueformLogoDarkSrc from '../assets/roqueform-logo-dark.png';
import roqueformLogoLightSrc from '../assets/roqueform-logo-light.png';
import { Readme } from '../components/readme/Readme';
import { lightDarkBackgroundImage } from '../components/utils';

export function RoqueformReadme() {
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
            width: '25rem',
          }}
          title={'Roqueform'}
        />
      }
      readme={readme}
    />
  );
}
