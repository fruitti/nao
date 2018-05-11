import { schema } from 'normalizr';

export const robotSchema = new schema.Entity('robots', {}, { idAttribute: 'id'});
export const peripheralSchema = new schema.Entity('peripherals', {}, { idAttribute: 'id'});
export const commandSchema = new schema.Entity('commands', {}, { idAttribute: 'id'});
export const userSchema = new schema.Entity('users', {}, { idAttribute: 'id'});
