import React from 'react';
import readme from '../gen/react-executor-readme';
import reactExecutorLogoDarkSrc from '../assets/react-executor-logo-dark.png';
import reactExecutorLogoLightSrc from '../assets/react-executor-logo-light.png';
import { Readme } from '../components/readme/Readme';
import { lightDarkBackgroundImage } from '../components/utils';

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
            width: '20rem',
          }}
          title={'React Executor'}
        />
      }
      readme={readme}
    />
  );
}
