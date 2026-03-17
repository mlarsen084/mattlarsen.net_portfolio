import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function GlowWord({ children }: Props) {
  return <span className="glow-word">{children}</span>;
}
