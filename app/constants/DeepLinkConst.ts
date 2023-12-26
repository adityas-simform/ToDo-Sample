export const domain: string = 'todo.page.link';

export const bundleId: string = 'com.simform.todo';

export const deepLinkPrefixes = ['todo://', `${domain}//`, `https://${domain}`];

export const deepLinkQueryParamsMatch: RegExp = /\?(.+)/;
export const routeReplace: RegExp = /.*?:\/\//g;
export const paramReplace: RegExp = /\/([^\\/]+)\/?$/;

export enum DeepLink {
  // todo://magic_link&lang=en&tenantId=austin-electrical-qqm76
  MagicLink = 'magic_link',
  // todo://forgot_password&lang=en&tenantId=austin-electrical-qqm76
  ForgotPassword = 'forgot_password',
  // todo://?toastMessage=<message content>
  ToastMessage = 'toastMessage'
}

export default DeepLink;
