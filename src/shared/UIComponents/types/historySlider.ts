import { CSSProperties } from 'react';

export type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited'|'unmounted';

export type TTransitionType={
  [key in TransitionState]:CSSProperties
}