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

  getName(ref:string): Observable<message> {
    return this.http.get<message>(`${this.baseUrl}/user/name/${ref}`, {withCredentials:true});
  }

  getUser(ref:string): Observable<Users>{
    return this.http.get<Users>(`${this.baseUrl}/user/getUser/${ref}`, {withCredentials:true});
  }

  checkIfValueExists(email: string) {
    return this.http.get<boolean>(`${this.baseUrl}/public/${email}`);
  }

  updateUser(user: Users, ref:string): Observable<message>{
    return this.http.put<message>(`${this.baseUrl}/user/update/${ref}`, user, {withCredentials:true});
  }

  addAddress(address:AddressesData, ref:string): Observable<message>{
    return this.http.post<message>(`${this.baseUrl}/user/addAddress/${ref}`, address, {withCredentials:true});
  }

  getAddresses(ref:string): Observable<AddressesResponse>{
    return this.http.get<AddressesResponse>(`${this.baseUrl}/user/getAddresses/${ref}`, {withCredentials:true});
  }

  updateAddress(address:AddressesData, ref:string): Observable<message>{
    return this.http.put<message>(`${this.baseUrl}/user/updateAddress/${ref}`, address, {withCredentials:true});
  }

  deleteAddress(id:number, ref:string): Observable<message>{
    return this.http.delete<message>(`${this.baseUrl}/user/deleteAddress/${id}/${ref}`, {withCredentials:true});
  }
}
