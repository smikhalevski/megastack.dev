import React from 'react';
import readme from '../gen/roqueform-readme.js';
import roqueformLogoDarkImage from '../assets/roqueform-logo-dark.png?w=600&format=webp&as=metadata';
import roqueformLogoLightImage from '../assets/roqueform-logo-light.png?w=600&format=webp&as=metadata';
import { Readme } from '../components/readme/Readme.js';
import { lightDarkImage } from '../components/utils.js';
import css from '../components/readme/Readme.module.css';

export default function RoqueformReadme() {
  return (
    <Readme
      logo={
        <div
          style={{ ...lightDarkImage(roqueformLogoLightImage, roqueformLogoDarkImage), width: '25rem' }}
          className={css.Logo}
          title={'Roqueform'}
        />
      }
      readme={readme}
    />
  );
}
