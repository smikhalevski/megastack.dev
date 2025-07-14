import React, { ReactNode } from 'react';
import css from './LandingPage.module.css';
import megaStackLogoLightURL from '../assets/mega-stack-logo-light.svg?no-inline';
import megaStackLogoDarkURL from '../assets/mega-stack-logo-dark.svg?no-inline';
import doubterLogoLightURL from '../assets/doubter-logo-light.png';
import doubterLogoDarkURL from '../assets/doubter-logo-dark.png';
import roqueformLogoLightURL from '../assets/roqueform-logo-light.png';
import roqueformLogoDarkURL from '../assets/roqueform-logo-dark.png';
import reactCorsairLogoLightURL from '../assets/react-corsair-logo-light.png';
import reactCorsairLogoDarkURL from '../assets/react-corsair-logo-dark.png';
import reactExecutorLogoLightURL from '../assets/react-executor-logo-light.png';
import reactExecutorLogoDarkURL from '../assets/react-executor-logo-dark.png';
import { Link } from 'react-corsair/history';
import { doubterReadmeRoute, reactCorsairReadmeRoute, reactExecutorReadmeRoute, roqueformReadmeRoute } from '../routes';
import { Route } from 'react-corsair';
import { ThemeSwitch } from '../components/theme-switch/ThemeSwitch';
import { lightDarkBackgroundImage } from '../components/utils';

export default function LandingPage() {
  return (
    <>
      <div className={css.LandingPage}>
        <div
          className={css.MegaLogo}
          style={{
            ...lightDarkBackgroundImage(megaStackLogoLightURL, megaStackLogoDarkURL),
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '10rem',
            aspectRatio: 1,
          }}
        />

        <LandingBlock
          to={reactExecutorReadmeRoute}
          logo={
            <div
              className={css.LibLogo}
              style={{
                ...lightDarkBackgroundImage(reactExecutorLogoLightURL, reactExecutorLogoDarkURL),
                aspectRatio: 1324 / 480,
              }}
              title={'React Executor'}
            />
          }
          overview={`
<b>Asynchronous task execution and state management for React.</b><br/>
<br/>
TypeScript first.<br/>
Expressive and concise API with strict typings.<br/>
Works great with SSR and Suspense.<br/>
Extensible with plugins.<br/>
First class devtools.<br/>
Just 5 kB gzipped.
`}
        />

        <LandingBlock
          to={reactCorsairReadmeRoute}
          logo={
            <div
              className={css.LibLogo}
              style={{
                ...lightDarkBackgroundImage(reactCorsairLogoLightURL, reactCorsairLogoDarkURL),
                aspectRatio: 830 / 470,
              }}
              title={'React Corsair'}
            />
          }
          overview={`
<b>Type-safe router that abstracts URLs away.</b><br/>
<br/>
TypeScript first: type-safe path and query parameters.<br/>
Code splitting, data loading and prefetching out-of-the box.<br/>
Route interception and inline routes.<br/>
Expressive and concise API with strict typings.<br/>
Supports SSR, partial pre-rendering and Suspense.<br/>
Optional history integration.<br/>
Just 9 kB gzipped.<br/>
`}
        />

        <LandingBlock
          to={doubterReadmeRoute}
          logo={
            <div
              className={css.LibLogo}
              style={{
                ...lightDarkBackgroundImage(doubterLogoLightURL, doubterLogoDarkURL),
                aspectRatio: 970 / 320,
              }}
              title={'Doubter'}
            />
          }
          overview={`
<b>Runtime validation and transformation library.</b><br/>
<br/>
TypeScript first.<br/>
Sync and async validation and transformation flows.<br/>
Circular object references support.<br/>
Collect all validation issues, or exit early.<br/>
Runtime type introspection.<br/>
Human-oriented type coercion.<br/>
High performance and low memory consumption.<br/>
Zero dependencies.<br/>
Pluggable architecture.<br/>
Tree-shakable: 3 — 12 kB gzipped depending on what features you use.
`}
        />

        <LandingBlock
          to={roqueformReadmeRoute}
          logo={
            <div
              className={css.LibLogo}
              style={{
                ...lightDarkBackgroundImage(roqueformLogoLightURL, roqueformLogoDarkURL),
                aspectRatio: 1500 / 270,
              }}
              title={'Roqueform'}
            />
          }
          overview={`
<b>The form state management library that can handle hundreds of fields without breaking a sweat.</b><br>
<br>
Expressive and concise API with strict typings;<br>
Controlled and uncontrolled inputs;<br>
Unparalleled extensibility with plugins;<br>
Supports your favourite rendering and validation libraries;<br>
Just 2 kB gzipped.<br>
`}
        />
      </div>

      <ThemeSwitch className={css.ThemeSwitchLanding} />
    </>
  );
}

interface LandingBlockProps {
  to: Route<any, {}>;
  logo: ReactNode;
  overview: string;
}

function LandingBlock(props: LandingBlockProps) {
  return (
    <Link
      to={props.to}
      className={css.LandingBlock}
    >
      {props.logo}
      <div
        className={css.Overview}
        dangerouslySetInnerHTML={{ __html: props.overview }}
      />
    </Link>
  );
}
