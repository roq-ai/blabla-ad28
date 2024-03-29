interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Account Owner'],
  customerRoles: [],
  tenantRoles: ['Account Owner'],
  tenantName: 'Organization',
  applicationName: 'BlaBla',
  addOns: ['chat', 'notifications', 'file'],
};
