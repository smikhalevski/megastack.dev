import React from 'react';
import readme from '../gen/doubter-readme.js';
import doubterLogoDarkSrc from '../assets/doubter-logo-dark.png';
import doubterLogoLightSrc from '../assets/doubter-logo-light.png';
import { Readme } from '../components/readme/Readme.js';
import { lightDarkBackgroundImage } from '../components/utils.js';

export default function DoubterReadme() {
  return (
    <Readme
      logo={
        <div
          style={{
            ...lightDarkBackgroundImage(doubterLogoLightSrc, doubterLogoDarkSrc),
            aspectRatio: 970 / 320,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            maxWidth: '100%',
            maxHeight: '100%',
            width: '20rem',
          }}
          title={'Doubter'}
        />
      }
      readme={readme}
    />
  );
}
