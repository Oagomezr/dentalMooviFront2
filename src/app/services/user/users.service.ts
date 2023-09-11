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

  getAllUsers(): Observable<Users[]>{
    return this.http.get<Users[]>(`${this.baseUrl}/admin`);
  }

  createUser(user: Users): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/public/create`, user);
  }

  sendEmailNotification(email:string): Observable<void>{
    return this.http.post<void>(`${this.baseUrl}/public/sendEmail`, email);
  }

  getUser(id:number): Observable<Users>{
    return this.http.get<Users>(`${this.baseUrl}/${id}`);
  }

  updateUser(id:number, user:Users):Observable<Users>{
    return this.http.put<Users>(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  checkIfValueExists(email: string) {
    return this.http.get<boolean>(`${this.baseUrl}/public/${email}`);
  }
}
