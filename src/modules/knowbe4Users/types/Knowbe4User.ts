export interface Knowbe4UserSchema {
  schemas: [string];
  userName: string;
  id?: string;
  name: object;
  externalId: string;
  locale: string;
  groups: [];
  emails: [object];
  active: boolean;
}
