import {Injectable} from '@angular/core';
import { User } from '../../model/auth/user.model';
import {SessionStorage} from "./session-storage";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private readonly storage: SessionStorage) { }

  signOut(): void {
    this.storage.clear();
  }

  public saveToken(token: string): void {
    this.storage.removeItem(TOKEN_KEY);
    this.storage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return this.storage.getItem(TOKEN_KEY);
  }

  saveUser(user: User): void {
    this.storage.removeItem(USER_KEY);
    this.storage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser(): User {
    return JSON.parse(this.storage.getItem(USER_KEY));
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null && this.getUser() !== null;
  }
}
