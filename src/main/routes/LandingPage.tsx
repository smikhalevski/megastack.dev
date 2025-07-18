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
import {
  doubterReadmeRoute,
  reactCorsairReadmeRoute,
  reactExecutorReadmeRoute,
  roqueformReadmeRoute,
} from '../routes.js';
import { Route } from 'react-corsair';
import { ThemeSwitch } from '../components/theme-switch/ThemeSwitch.js';
import { lightDarkBackgroundImage } from '../components/utils.js';
import doubterOverview from '../gen/doubter-overview.js';
import reactCorsairOverview from '../gen/react-corsair-overview.js';
import reactExecutorOverview from '../gen/react-executor-overview.js';
import roqueformOverview from '../gen/roqueform-overview.js';
import { RawDiv } from '../components/RawDiv.js';

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

        <LandingLink
          to={reactExecutorReadmeRoute}
          logo={
            <div
              className={css.LandingLinkLogo}
              style={{
                ...lightDarkBackgroundImage(reactExecutorLogoLightURL, reactExecutorLogoDarkURL),
                aspectRatio: 1324 / 480,
              }}
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
              style={{
                ...lightDarkBackgroundImage(reactCorsairLogoLightURL, reactCorsairLogoDarkURL),
                aspectRatio: 830 / 470,
              }}
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
              style={{
                ...lightDarkBackgroundImage(doubterLogoLightURL, doubterLogoDarkURL),
                aspectRatio: 970 / 320,
              }}
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
              style={{
                ...lightDarkBackgroundImage(roqueformLogoLightURL, roqueformLogoDarkURL),
                aspectRatio: 1500 / 270,
              }}
              title={'Roqueform'}
            />
          }
          overview={roqueformOverview.overviewContent}
        />
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
