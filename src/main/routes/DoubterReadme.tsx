import React from 'react';
import readme from '../gen/doubter-readme.js';
import doubterLogoDarkImage from '../assets/doubter-logo-dark.png?w=600&format=webp&as=metadata';
import doubterLogoLightImage from '../assets/doubter-logo-light.png?w=600&format=webp&as=metadata';
import { Readme } from '../components/readme/Readme.js';
import { lightDarkImage } from '../components/utils.js';
import css from '../components/readme/Readme.module.css';

export default function DoubterReadme() {
  return (
    <Readme
      logo={
        <div
          style={lightDarkImage(doubterLogoLightImage, doubterLogoDarkImage)}
          className={css.Logo}
          title={'Doubter'}
        />
      }
      readme={readme}
    />
  );
}
