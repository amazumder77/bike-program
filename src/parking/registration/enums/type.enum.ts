/* eslint no-shadow: ["error", { "allow": ["TypeEnum"] }]*/

export enum EventTypeEnum {
  BIKE = 'BIKE',
  WALK = 'WALK',
  RUN = 'RUN',
}

export const EventTypeEnumValues = new Set(Object.values(EventTypeEnum));
