import React from 'react';
import readme from '../gen/racehorse-readme.js';
import racehorseLogoDarkImage from '../assets/racehorse-logo-dark.png?w=600&format=webp&as=metadata';
import racehorseLogoLightImage from '../assets/racehorse-logo-light.png?w=600&format=webp&as=metadata';
import { Readme } from '../components/readme/Readme.js';
import { lightDarkImage } from '../components/utils.js';
import css from '../components/readme/Readme.module.css';

export default function RacehorseReadme() {
  return (
    <Readme
      logo={
        <div
          style={lightDarkImage(racehorseLogoLightImage, racehorseLogoDarkImage)}
          className={css.Logo}
          title={'Racehorse'}
        />
      }
      readme={readme}
    />
  );
}
