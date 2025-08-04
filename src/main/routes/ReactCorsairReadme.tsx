import React from 'react';
import readme from '../gen/react-corsair-readme.js';
import reactCorsairLogoDarkImage from '../assets/react-corsair-logo-dark.png?w=600&format=webp&as=metadata';
import reactCorsairLogoLightImage from '../assets/react-corsair-logo-light.png?w=600&format=webp&as=metadata';
import { Readme } from '../components/readme/Readme.js';
import { lightDarkImage } from '../components/utils.js';
import css from '../components/readme/Readme.module.css';

export default function ReactCorsairReadme() {
  return (
    <Readme
      logo={
        <div
          style={lightDarkImage(reactCorsairLogoLightImage, reactCorsairLogoDarkImage)}
          className={css.Logo}
          title={'React Corsair'}
        />
      }
      readme={readme}
    />
  );
}
