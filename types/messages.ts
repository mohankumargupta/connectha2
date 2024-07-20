// This file has no imports on purpose
// So it can easily be consumed by other TS projects

export type Error = 1 | 2 | 3 | 4;

export type UnsubscribeFunc = () => void;

export type MessageBase = {
  id?: number;
  type: string;
  [key: string]: any;
};

export type Context = {
  id: string;
  user_id: string | null;
  parent_id: string | null;
};

export type HassEventBase = {
  origin: string;
  time_fired: string;
  context: Context;
};

export type HassEvent = HassEventBase & {
  event_type: string;
  data: { [key: string]: any };
};

export type StateChangedEvent = HassEventBase & {
  event_type: "state_changed";
  data: {
    entity_id: string;
    new_state: HassEntity | null;
    old_state: HassEntity | null;
  };
};

export type HassConfig = {
  latitude: number;
  longitude: number;
  elevation: number;
  radius: number;
  unit_system: {
    length: string;
    mass: string;
    volume: string;
    temperature: string;
    pressure: string;
    wind_speed: string;
    accumulated_precipitation: string;
  };
  location_name: string;
  time_zone: string;
  components: string[];
  config_dir: string;
  allowlist_external_dirs: string[];
  allowlist_external_urls: string[];
  version: string;
  config_source: string;
  recovery_mode: boolean;
  safe_mode: boolean;
  state: "NOT_RUNNING" | "STARTING" | "RUNNING" | "STOPPING" | "FINAL_WRITE";
  external_url: string | null;
  internal_url: string | null;
  currency: string;
  country: string | null;
  language: string;
};

export type HassEntityBase = {
  entity_id: string;
  state: string;
  last_changed: string;
  last_updated: string;
  attributes: HassEntityAttributeBase;
  context: Context;
};

export type HassEntityAttributeBase = {
  friendly_name?: string;
  unit_of_measurement?: string;
  icon?: string;
  entity_picture?: string;
  supported_features?: number;
  hidden?: boolean;
  assumed_state?: boolean;
  device_class?: string;
  state_class?: string;
  restored?: boolean;
};

export type HassEntity = HassEntityBase & {
  attributes: { [key: string]: any };
};

export type HassEntities = { [entity_id: string]: HassEntity };

export type HassService = {
  name?: string;
  description: string;
  target?: {} | null;
  fields: {
    [field_name: string]: {
      example?: string | boolean | number;
      default?: unknown;
      required?: boolean;
      advanced?: boolean;
      selector?: {};
      filter?: {
        supported_features?: number[];
        attribute?: Record<string, any[]>;
      };
      // Custom integrations don't use translations and still have name/description
      name?: string;
      description: string;
    };
  };
  response?: { optional: boolean };
};

export type HassDomainServices = {
  [service_name: string]: HassService;
};

export type HassServices = {
  [domain: string]: HassDomainServices;
};

export type HassUser = {
  id: string;
  is_admin: boolean;
  is_owner: boolean;
  name: string;
};

export type HassServiceTarget = {
  entity_id?: string | string[];
  device_id?: string | string[];
  area_id?: string | string[];
  floor_id?: string | string[];
  label_id?: string | string[];
};

export function auth(accessToken: string) {
  return {
    type: "auth",
    access_token: accessToken,
  };
}

export function supportedFeatures() {
  return {
    type: "supported_features",
    id: 1, // Always the first message after auth
    features: { coalesce_messages: 1 },
  };
}

export function states() {
  return {
    type: "get_states",
  };
}

export function config() {
  return {
    type: "get_config",
  };
}

export function services() {
  return {
    type: "get_services",
  };
}

export function user() {
  return {
    type: "auth/current_user",
  };
}

type ServiceCallMessage = {
  type: "call_service";
  domain: string;
  service: string;
  service_data?: object;
  target?: HassServiceTarget;
  return_response?: boolean;
};

export function callService(
  domain: string,
  service: string,
  serviceData?: object,
  target?: HassServiceTarget,
  returnResponse?: boolean,
) {
  const message: ServiceCallMessage = {
    type: "call_service",
    domain,
    service,
    target,
    return_response: returnResponse,
  };

  if (serviceData) {
    message.service_data = serviceData;
  }

  return message;
}

type SubscribeEventMessage = {
  type: "subscribe_events";
  event_type?: string;
};

export function subscribeEvents(eventType?: string) {
  const message: SubscribeEventMessage = {
    type: "subscribe_events",
  };

  if (eventType) {
    message.event_type = eventType;
  }

  return message;
}

export function unsubscribeEvents(subscription: number) {
  return {
    type: "unsubscribe_events",
    subscription,
  };
}

export function ping() {
  return {
    type: "ping",
  };
}

export function subscribe_trigger(entity_id: string) {
  return {
    type: "subscribe_trigger",
    trigger: {
        platform: "state",
        entity_id: entity_id,
    }
  };
}

export function error(code: Error, message: string) {
  return {
    type: "result",
    success: false,
    error: {
      code,
      message,
    },
  };
}