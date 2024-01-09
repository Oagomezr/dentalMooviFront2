import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../../models/users';
import { message } from 'src/app/models/message';
import { AddressesData } from 'src/app/models/addresses/addressesData';
import { AddressesResponse } from 'src/app/models/addresses/addressesResponse';

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

  updateUser(user: Users): Observable<message>{
    return this.http.put<message>(`${this.baseUrl}/user/update`, user, {withCredentials:true});
  }

  addAddress(address:AddressesData): Observable<message>{
    return this.http.post<message>(`${this.baseUrl}/user/addAddress`, address, {withCredentials:true});
  }

  getAddresses(): Observable<AddressesResponse>{
    return this.http.get<AddressesResponse>(`${this.baseUrl}/user/getAddresses`, {withCredentials:true});
  }

  updateAddress(address:AddressesData): Observable<message>{
    return this.http.put<message>(`${this.baseUrl}/user/updateAddress`, address, {withCredentials:true});
  }

  deleteAddress(id:number): Observable<message>{
    return this.http.delete<message>(`${this.baseUrl}/user/deleteAddress/${id}`, {withCredentials:true});
  }
}
