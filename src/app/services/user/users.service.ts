import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'http://localhost:8087';

  constructor(private http: HttpClient) {}

  createUser(user: Users): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/public/create`, user);
  }

  sendEmailNotification(email:string): Observable<void>{
    return this.http.post<void>(`${this.baseUrl}/public/sendEmail`, email);
  }

  getUser(): Observable<Users>{
    return this.http.get<Users>(`${this.baseUrl}/user/getUser`, {withCredentials:true});
  }

  checkIfValueExists(email: string) {
    return this.http.get<boolean>(`${this.baseUrl}/public/${email}`);
  }
}
