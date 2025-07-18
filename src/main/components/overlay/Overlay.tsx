import { motion, Variants } from 'motion/react';
import React, { ReactElement, ReactNode, useEffect, useRef } from 'react';
import { callOrGet, mergeClassNames, usePreventScroll } from 'react-hookers';
import { NestableAnimatePresence } from '../NestableAnimatePresence.js';
import { Portal } from '../Portal.js';
import css from './Overlay.module.css';

interface OverlayProps {
  isOpened?: boolean;
  children?: ReactNode | (() => ReactNode);
  className?: string;
  onExitComplete?: () => void;
}

export function Overlay(props: OverlayProps): ReactElement {
  const { isOpened, className, children, onExitComplete } = props;

  const ref = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    if (ref.current !== null) {
      ref.current.style.width = window.innerWidth + 'px';
      ref.current.style.height = window.innerHeight + 'px';
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  usePreventScroll({
    isDisabled: !isOpened,
  });

  return (
    <NestableAnimatePresence onExitComplete={onExitComplete}>
      {isOpened && (
        <Portal onOpen={handleResize}>
          <motion.div
            ref={ref}
            className={mergeClassNames(css.Overlay, className)}
            initial={'closed'}
            animate={'opened'}
            exit={'closed'}
            variants={overlayVariants}
          >
            {callOrGet(children)}
          </motion.div>
        </Portal>
      )}
    </NestableAnimatePresence>
  );
}

const overlayVariants: Variants = {
  opened: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    // backdropFilter: 'blur(2px)',
    transition: { duration: 0.2 },
  },
  closed: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    // backdropFilter: 'blur(0px)',
    transition: { duration: 0.2 },
  },
};
