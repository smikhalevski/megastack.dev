import React, { ReactNode, useEffect, useState } from 'react';
import css from './Readme.module.css';
import { Link } from 'react-corsair/history';
import { landingPageRoute } from '../../routes';
import { ThemeSwitch } from '../theme-switch/ThemeSwitch';
import megaLogoLightSrc from '../../assets/mega-logo-light.svg?no-inline';
import megaLogoDarkSrc from '../../assets/mega-logo-dark.svg?no-inline';
import { mergeClassNames, usePreventScroll } from 'react-hookers';
import { lightDarkBackgroundImage } from '../utils';
import { useRouter } from 'react-corsair';

export interface Readme {
  version: string;
  overviewContent: string;
  tocContent: string;
  articleContent: string;
}

interface ReadmeProps {
  logo: ReactNode;
  readme: Readme;
}

export function Readme(props: ReadmeProps) {
  const router = useRouter();

  useEffect(() => {
    if (router.location === null) {
      return;
    }
    document.getElementById(router.location.hash)?.scrollIntoView({ block: 'start', behavior: 'instant' });
  }, []);

  return (
    <div className={mergeClassNames(css.Readme)}>
      <Nav {...props} />

      <article className={'markdown-body'}>
        <div className={css.ArticleBanner}>
          {props.logo}
          <div className={css.Version}>{'v' + props.readme.version}</div>
        </div>

        <div
          className={css.ArticleBody}
          dangerouslySetInnerHTML={{ __html: props.readme.overviewContent + props.readme.articleContent }}
        />
      </article>
    </div>
  );
}

function Nav(props: ReadmeProps) {
  const [isSidebarOpened, setSidebarOpened] = useState(false);

  usePreventScroll({
    isDisabled: !isSidebarOpened,
  });

  return (
    <nav className={mergeClassNames('markdown-body', isSidebarOpened && css.SidebarOpened)}>
      <div className={css.NavHeader}>
        <div className={css.MegaLogoAndSidebarToggle}>
          <button
            className={css.SidebarToggle}
            onClick={() => setSidebarOpened(true)}
          />

          <Link
            to={landingPageRoute}
            className={css.MegaLogo}
            style={lightDarkBackgroundImage(megaLogoLightSrc, megaLogoDarkSrc)}
          />
        </div>

        <ThemeSwitch />
      </div>

      <div className={css.NavBanner}>
        {props.logo}
        <div className={css.Version}>{'v' + props.readme.version}</div>
      </div>

      <div
        className={css.Overlay}
        onClick={() => setSidebarOpened(false)}
      />

      <div
        className={css.TOC}
        dangerouslySetInnerHTML={{ __html: props.readme.tocContent }}
      />
    </nav>
  );
}
