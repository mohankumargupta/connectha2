import { EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoNsd.web.ts
// and on native platforms to ExpoNsd.ts
import ExpoNsdModule from './src/ExpoNsdModule';
import { ChangeEventPayload, ExpoNsdViewProps } from './src/ExpoNsd.types';
import { Service } from './src/ExpoNsd.types';

export function requestPermissions() {
  return ExpoNsdModule.requestPermissions();
}

export function startDiscovery() {
  return ExpoNsdModule.startDiscovery();
}

export function stopDiscovery() {
  return ExpoNsdModule.stopDiscovery();
}

const emitter = new EventEmitter(ExpoNsdModule);

export function configureDiscovery(serviceType: string, listener: (event: Service) => void): Subscription {
  ExpoNsdModule.configureDiscovery(serviceType)
  return emitter.addListener<Service>('onServiceDiscovered', listener);
}


export { Service };

/*
// Get the native constant value.
export const PI = ExpoNsdModule.PI;

export function hello(): string {
  return ExpoNsdModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoNsdModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoNsdModule);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoNsdViewProps, ChangeEventPayload };
*/