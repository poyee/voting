import {environment} from "../environments/environment";

export class AppConstants {
  static API_HOST = environment.apiHost;
  static BASE_PATH = '/api';
  static POLL_URI = `${this.API_HOST}${AppConstants.BASE_PATH}/polls`;
  static VOTE_URI = `${this.API_HOST}${AppConstants.BASE_PATH}/votes`;
  static AUTH_URI = `${this.API_HOST}${AppConstants.BASE_PATH}/auth`;
  static USER_URI = `${this.API_HOST}${AppConstants.BASE_PATH}/users`;
  static COMMENT_URI = `${this.API_HOST}${AppConstants.BASE_PATH}/comments`;

  private static OAUTH2_URL = `${this.API_HOST}${AppConstants.BASE_PATH}/oauth2/authorization/`;

  public static GOOGLE_AUTH_URL = `${AppConstants.OAUTH2_URL}google`;
}
