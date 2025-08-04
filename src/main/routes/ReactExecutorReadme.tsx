import React from 'react';
import readme from '../gen/react-executor-readme.js';
import reactExecutorLogoDarkImage from '../assets/react-executor-logo-dark.png?w=600&format=webp&as=metadata';
import reactExecutorLogoLightImage from '../assets/react-executor-logo-light.png?w=600&format=webp&as=metadata';
import { Readme } from '../components/readme/Readme.js';
import { lightDarkImage } from '../components/utils.js';
import css from '../components/readme/Readme.module.css';

export default function ReactExecutorReadme() {
  return (
    <Readme
      logo={
        <div
          style={lightDarkImage(reactExecutorLogoLightImage, reactExecutorLogoDarkImage)}
          className={css.Logo}
          title={'React Executor'}
        />
      }
      readme={readme}
    />
  );
}
