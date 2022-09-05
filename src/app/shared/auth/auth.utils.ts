export class AuthUtils {
  static getLoginUri(): string {
    return `/login?redirectUrl=${window.location.href}`;
  }
}
