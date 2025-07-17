import { ReactNode, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
  onOpen?: () => void;
}

export function Portal(props: PortalProps): ReactNode {
  const { children, onOpen } = props;

  const [isOpened, setOpened] = useState(false);

  useLayoutEffect(() => {
    if (isOpened) {
      onOpen?.();
    } else {
      setOpened(true);
    }
  }, [isOpened]);

  return isOpened ? createPortal(children, document.body) : null;
}
