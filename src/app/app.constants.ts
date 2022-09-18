export class AppConstants {
  static HOST = 'http://localhost:8080';
  static BASE_PATH = '/api';
  static POLL_URI = `${AppConstants.BASE_PATH}/polls`;
  static VOTE_URI = `${AppConstants.BASE_PATH}/votes`;
  static AUTH_URI = `${AppConstants.BASE_PATH}/auth`;
  static USER_URI = `${AppConstants.BASE_PATH}/users`;
  static COMMENT_URI = `${AppConstants.BASE_PATH}/comments`;

  private static OAUTH2_URL = `${AppConstants.HOST}${AppConstants.BASE_PATH}/oauth2/authorization/`;
  private static REDIRECT_URL = `http://localhost:4200/login`;

  public static GOOGLE_AUTH_URL = `${AppConstants.OAUTH2_URL}google`;
}
