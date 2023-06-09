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

  createUser(user:Users): Observable<Users>{
    return this.http.post<Users>(`${this.baseUrl}/public/create`, user);
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

  checkIfValueExists(field: string, value: string) {
    return this.http.get<boolean>(`${this.baseUrl}/public/${field}/${value}`);
  }
}
