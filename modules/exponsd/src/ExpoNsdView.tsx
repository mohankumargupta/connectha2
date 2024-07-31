import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoNsdViewProps } from './ExpoNsd.types';

const NativeView: React.ComponentType<ExpoNsdViewProps> =
  requireNativeViewManager('ExpoNsd');

export default function ExpoNsdView(props: ExpoNsdViewProps) {
  return <NativeView {...props} />;
}
