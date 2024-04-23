import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUser, RegisterUser } from '../../types/user';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http: HttpClient = inject(HttpClient);

  public registerUser(user: RegisterUser): Observable<RegisterUser> {
    return this.http.post<RegisterUser>('/api/user/register', user);
  }

  public loginUser(user: LoginUser): Observable<RegisterUser> {
    return this.http.post<RegisterUser>('/api/user/login', user);
  }

}
