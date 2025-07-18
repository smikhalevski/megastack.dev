import React from 'react';
import readme from '../gen/react-executor-readme.js';
import reactExecutorLogoDarkSrc from '../assets/react-executor-logo-dark.png';
import reactExecutorLogoLightSrc from '../assets/react-executor-logo-light.png';
import { Readme } from '../components/readme/Readme.js';
import { lightDarkBackgroundImage } from '../components/utils.js';

export default function ReactExecutorReadme() {
  return (
    <Readme
      logo={
        <div
          style={{
            ...lightDarkBackgroundImage(reactExecutorLogoLightSrc, reactExecutorLogoDarkSrc),
            aspectRatio: 1324 / 480,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            maxWidth: '100%',
            maxHeight: '100%',
            width: '20rem',
          }}
          title={'React Executor'}
        />
      }
      readme={readme}
    />
  );
}
