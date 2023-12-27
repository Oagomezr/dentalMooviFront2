import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuth } from 'src/app/models/userAuth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  private baseUrl = 'http://localhost:8087';

  constructor(private http: HttpClient) {}

  login(userAuth: UserAuth): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/public/login`, userAuth, {withCredentials:true});
  }

  checkRole(userAuth: UserAuth): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/public/isAuthorized`, userAuth, {withCredentials:true});
  }

  logout() {
    return this.http.delete(`${this.baseUrl}/public/logout`, {withCredentials:true});
  }
}
