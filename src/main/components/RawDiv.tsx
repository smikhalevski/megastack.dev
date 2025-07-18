import React, { HTMLAttributes, useMemo } from 'react';

interface RawDivProps extends HTMLAttributes<HTMLDivElement> {
  children: string;
}

export function RawDiv(props: RawDivProps) {
  const { children, ...divProps } = props;

  return (
    <div
      {...divProps}
      dangerouslySetInnerHTML={useMemo(() => ({ __html: children }), [children])}
    />
  );
}
