import * as React from 'react';

import { ExpoNsdViewProps } from './ExpoNsd.types';

export default function ExpoNsdView(props: ExpoNsdViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
