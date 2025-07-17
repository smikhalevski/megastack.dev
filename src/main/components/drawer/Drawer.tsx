import React, { ReactElement, ReactNode, useRef } from 'react';
import { Overlay } from '../overlay/Overlay';
import css from './Drawer.module.css';
import { callOrGet, FocusScope, mergeClassNames, useClickAway, useKeyboardShortcut } from 'react-hookers';
import { motion, MotionProps, Variants } from 'motion/react';

interface DrawerProps {
  isOpened?: boolean;
  align?: 'start' | 'end';
  onClose?: () => void;
  children?: ReactNode | (() => ReactNode);
  className?: string;
  isEscapable?: boolean;
  isClickAway?: boolean;
  onExitComplete?: () => void;
}

export function Drawer(props: DrawerProps): ReactElement {
  const { isOpened, onExitComplete } = props;

  return (
    <Overlay
      isOpened={isOpened}
      onExitComplete={onExitComplete}
    >
      <InternalDrawer {...props} />
    </Overlay>
  );
}

function InternalDrawer(props: DrawerProps): ReactElement {
  const { align = 'start', isEscapable, isClickAway, className, children, onClose } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  useKeyboardShortcut({
    isDisabled: !isEscapable,
    shortcut: ['Escape'],
    onAction: onClose,
  });

  const { containerProps } = useClickAway({
    isDisabled: !isClickAway,
    onClickAway: onClose,
  });

  return (
    <FocusScope
      containerRef={containerRef}
      isFocusTrap={true}
      isFocusRestored={true}
    >
      <motion.div
        {...(containerProps as MotionProps)}
        ref={containerRef}
        className={mergeClassNames(css.Drawer, align === 'start' ? css.AlignStart : css.AlignEnd, className)}
        initial={'closed'}
        animate={'opened'}
        exit={'closed'}
        variants={align === 'start' ? drawerVariantsLeft : drawerVariantsRight}
      >
        {callOrGet(children)}
      </motion.div>
    </FocusScope>
  );
}

const drawerVariantsLeft: Variants = {
  opened: {
    x: 0,
    transition: { duration: 0.3 },
  },
  closed: {
    x: '-100%',
    transition: { duration: 0.3 },
  },
};

const drawerVariantsRight: Variants = {
  opened: {
    x: 0,
    transition: { duration: 0.3 },
  },
  closed: {
    x: '100%',
    transition: { duration: 0.3 },
  },
};
