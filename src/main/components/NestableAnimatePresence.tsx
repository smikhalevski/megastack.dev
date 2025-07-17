import { AnimatePresence, AnimatePresenceProps, usePresence } from 'motion/react';
import React, { PropsWithChildren, ReactElement, useEffect } from 'react';

export function NestableAnimatePresence(props: PropsWithChildren<AnimatePresenceProps>): ReactElement {
  const { children } = props;

  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (!isPresent) {
      safeToRemove();
    }
  }, [isPresent]);

  return <AnimatePresence {...props}>{isPresent && children}</AnimatePresence>;
}
