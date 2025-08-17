import React, { ReactNode } from 'react';
import css from './LandingPage.module.css';
import megaStackLogoLightImage from '../assets/mega-stack-logo-light.png?w=600&format=webp&as=metadata';
import megaStackLogoDarkImage from '../assets/mega-stack-logo-dark.png?w=600&format=webp&as=metadata';
import doubterLogoLightImage from '../assets/doubter-logo-light.png?w=600&format=webp&as=metadata';
import doubterLogoDarkImage from '../assets/doubter-logo-dark.png?w=600&format=webp&as=metadata';
import roqueformLogoLightImage from '../assets/roqueform-logo-light.png?w=600&format=webp&as=metadata';
import roqueformLogoDarkImage from '../assets/roqueform-logo-dark.png?w=600&format=webp&as=metadata';
import reactCorsairLogoLightImage from '../assets/react-corsair-logo-light.png?w=600&format=webp&as=metadata';
import reactCorsairLogoDarkImage from '../assets/react-corsair-logo-dark.png?w=600&format=webp&as=metadata';
import reactExecutorLogoLightImage from '../assets/react-executor-logo-light.png?w=600&format=webp&as=metadata';
import reactExecutorLogoDarkImage from '../assets/react-executor-logo-dark.png?w=600&format=webp&as=metadata';
import { Link } from 'react-corsair/history';
import {
  doubterReadmeRoute,
  reactCorsairReadmeRoute,
  reactExecutorReadmeRoute,
  roqueformReadmeRoute,
} from '../routes.js';
import { Route } from 'react-corsair';
import { ThemeSwitch } from '../components/theme-switch/ThemeSwitch.js';
import { lightDarkImage } from '../components/utils.js';
import doubterOverview from '../gen/doubter-overview.js';
import reactCorsairOverview from '../gen/react-corsair-overview.js';
import reactExecutorOverview from '../gen/react-executor-overview.js';
import roqueformOverview from '../gen/roqueform-overview.js';
import { RawDiv } from '../components/RawDiv.js';
import { mergeClassNames } from 'react-hookers';

export default function LandingPage() {
  return (
    <>
      <div className={css.LandingPage}>
        <div
          className={css.MegaLogo}
          style={lightDarkImage(megaStackLogoLightImage, megaStackLogoDarkImage)}
        />

        <div className={mergeClassNames(css.MegaStackOverview)}>
          <p>
            {
              'MegaStack is a web frontend bootstrapper that provides tools for routing, data fetching, task execution, form state management and validation out-of-the-box.'
            }
          </p>
          <p>
            {
              'Applications built with MegaStack support both streaming SSR and standalone CSR simultaneously and can be deployed in any environment. Every part of MegaStack is designed to be as performant and memory-optimized as possible, while offering concise, expressive APIs and an excellent developer experience.'
            }
          </p>
        </div>

        <div className={css.MegaStackCTA}>
          <pre>npx megastack init</pre>
        </div>

        <LandingLink
          to={reactExecutorReadmeRoute}
          logo={
            <div
              className={css.LandingLinkLogo}
              style={lightDarkImage(reactExecutorLogoLightImage, reactExecutorLogoDarkImage)}
              title={'React Executor'}
            />
          }
          overview={reactExecutorOverview.overviewContent}
        />

        <LandingLink
          to={reactCorsairReadmeRoute}
          logo={
            <div
              className={css.LandingLinkLogo}
              style={lightDarkImage(reactCorsairLogoLightImage, reactCorsairLogoDarkImage)}
              title={'React Corsair'}
            />
          }
          overview={reactCorsairOverview.overviewContent}
        />

        <LandingLink
          to={doubterReadmeRoute}
          logo={
            <div
              className={css.LandingLinkLogo}
              style={lightDarkImage(doubterLogoLightImage, doubterLogoDarkImage)}
              title={'Doubter'}
            />
          }
          overview={doubterOverview.overviewContent}
        />

        <LandingLink
          to={roqueformReadmeRoute}
          logo={
            <div
              className={css.LandingLinkLogo}
              style={lightDarkImage(roqueformLogoLightImage, roqueformLogoDarkImage)}
              title={'Roqueform'}
            />
          }
          overview={roqueformOverview.overviewContent}
        />

        <div className={css.LandingFooter}>
          <a href="https://github.com/smikhalevski">{'@smikhalevski'}</a>
        </div>
      </div>

      <ThemeSwitch className={css.ThemeSwitchLanding} />
    </>
  );
}

interface LandingLinkProps {
  to: Route<any, {}>;
  logo: ReactNode;
  overview: string;
}

function LandingLink(props: LandingLinkProps) {
  return (
    <Link
      to={props.to}
      className={css.LandingLink}
    >
      {props.logo}
      <RawDiv className={css.Overview}>{props.overview}</RawDiv>
    </Link>
  );
}
