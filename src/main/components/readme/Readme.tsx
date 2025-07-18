import React, { MouseEventHandler, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import css from './Readme.module.css';
import { Link, useHistory } from 'react-corsair/history';
import { landingPageRoute } from '../../routes.js';
import { ThemeSwitch } from '../theme-switch/ThemeSwitch.js';
import megaLogoLightSrc from '../../assets/mega-logo-light.svg?no-inline';
import megaLogoDarkSrc from '../../assets/mega-logo-dark.svg?no-inline';
import { HeadlessButtonProps, mergeClassNames, useButton, useMediaQuery } from 'react-hookers';
import { lightDarkBackgroundImage } from '../utils.js';
import { useRouter } from 'react-corsair';
import { Drawer } from '../drawer/Drawer.js';
import { RawDiv } from '../RawDiv.js';

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
  const isDesktop = useMediaQuery('(min-width: 60rem)', true);

  useEffect(() => {
    if (router.location === null) {
      return;
    }
    document.getElementById(router.location.hash)?.scrollIntoView({ block: 'start', behavior: 'instant' });
  }, []);

  return (
    <div className={mergeClassNames(css.Readme)}>
      {!isDesktop && (
        <MobileHeader
          logo={props.logo}
          tocContent={props.readme.tocContent}
        />
      )}

      <Sidebar
        logo={props.logo}
        version={props.readme.version}
        tocContent={props.readme.tocContent}
      />

      <article className={css.Article}>
        <div className={css.MobileArticleLogo}>
          {props.logo}
          <div className={css.Version}>{'v' + props.readme.version}</div>
        </div>

        <RawDiv className={css.ArticleBody}>{props.readme.overviewContent + props.readme.articleContent}</RawDiv>
      </article>
    </div>
  );
}

interface SidebarProps {
  logo: ReactNode;
  version: string;
  tocContent: string;
}

function Sidebar(props: SidebarProps) {
  const { logo, version, tocContent } = props;

  return (
    <div className={css.Sidebar}>
      <div className={css.SidebarNav}>
        <div className={css.SidebarHeader}>
          <Link
            to={landingPageRoute}
            className={css.MegaLogo}
            style={lightDarkBackgroundImage(megaLogoLightSrc, megaLogoDarkSrc)}
          />

          <ThemeSwitch />
        </div>

        <div className={css.SidebarLogo}>
          {logo}
          <div className={css.Version}>{'v' + version}</div>
        </div>
      </div>

      <RawDiv className={css.TOC}>{tocContent}</RawDiv>
    </div>
  );
}

interface MobileHeaderProps {
  logo: ReactNode;
  tocContent: string;
}

function MobileHeader(props: MobileHeaderProps) {
  const { logo, tocContent } = props;

  const [isDrawerOpened, setDrawerOpened] = useState(false);
  const history = useHistory();
  const nextLocationHash = useRef('');

  const handleOpenDrawer = () => {
    nextLocationHash.current = '';
    setDrawerOpened(true);
  };

  const handleCloseDrawer = () => setDrawerOpened(false);

  const handleDrawerClosed = () => {
    if (nextLocationHash.current !== '') {
      history.push(history.location.pathname + nextLocationHash.current);
    }
  };

  const handleTOCAnchorClick: MouseEventHandler = event => {
    setDrawerOpened(false);

    const href = (event.target as HTMLAnchorElement).getAttribute('href');

    if (href === null || !href.startsWith('#')) {
      return;
    }

    event.preventDefault();
    nextLocationHash.current = href;
  };

  return (
    <div className={css.MobileHeader}>
      <Drawer
        className={css.MobileDrawer}
        isOpened={isDrawerOpened}
        isClickAway={true}
        isEscapable={true}
        onClose={handleCloseDrawer}
        onExitComplete={handleDrawerClosed}
      >
        <div className={css.MobileDrawerHeader}>
          {logo}

          <MobileDrawerToggleButton
            kind={'close'}
            onPress={handleCloseDrawer}
          />
        </div>
        <RawDiv
          className={css.MobileTOC}
          onClick={handleTOCAnchorClick}
        >
          {tocContent}
        </RawDiv>
      </Drawer>

      <MobileDrawerToggleButton
        kind={'open'}
        onPress={handleOpenDrawer}
      />

      <Link
        to={landingPageRoute}
        className={css.MegaLogo}
        style={lightDarkBackgroundImage(megaLogoLightSrc, megaLogoDarkSrc)}
      />

      <ThemeSwitch className={css.MobileThemeSwitch} />
    </div>
  );
}

interface MobileDrawerToggleButtonProps extends HeadlessButtonProps {
  kind: 'open' | 'close';
  className?: string;
}

function MobileDrawerToggleButton(props: MobileDrawerToggleButtonProps) {
  const { kind, className } = props;

  const { buttonProps, isFocusVisible } = useButton(props);

  return (
    <button
      {...buttonProps}
      className={mergeClassNames(
        css.MobileDrawerToggleButton,
        isFocusVisible && css.FocusVisible,
        kind === 'open' ? css.KindOpen : css.KindClose,
        className
      )}
    />
  );
}
