import React from 'react';
import readme from '../gen/mfml-readme.js';
import mfmlLogoDarkImage from '../assets/mfml-logo-dark.png?w=600&format=webp&as=metadata';
import mfmlLogoLightImage from '../assets/mfml-logo-light.png?w=600&format=webp&as=metadata';
import { Readme } from '../components/readme/Readme.js';
import { lightDarkImage } from '../components/utils.js';
import css from '../components/readme/Readme.module.css';

export default function MFMLReadme() {
  return (
    <Readme
      logo={
        <div
          style={{ ...lightDarkImage(mfmlLogoLightImage, mfmlLogoDarkImage), width: '25rem' }}
          className={css.Logo}
          title={'MFML'}
        />
      }
      readme={readme}
    />
  );
}
