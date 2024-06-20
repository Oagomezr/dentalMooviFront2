import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../../models/users';
import { message } from 'src/app/models/message';
import { AddressesData } from 'src/app/models/addresses/addressesData';
import { AddressesResponse } from 'src/app/models/addresses/addressesResponse';
import { Enum1 } from 'src/app/models/enums/enum1/enum1';
import { UserAuth } from 'src/app/models/userAuth';
import { URL_BACK } from 'src/app/env';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

  createUser(user: Users): Observable<void> {
    return this.http.post<void>(`${URL_BACK}/public/create`, user);
  }

  sendEmailNotification(email:string): Observable<void>{
    return this.http.post<void>(`${URL_BACK}/public/sendEmail`, email);
  }

  getName(): Observable<message> {
    return this.http.get<message>(`${URL_BACK}/user/name`, {withCredentials:true});
  }

  getUser(): Observable<Users>{
    return this.http.get<Users>(`${URL_BACK}/user/getUser`, {withCredentials:true});
  }

  checkIfValueExists(email: string, signup: boolean) {
    return this.http.get<boolean>(`${URL_BACK}/public/${email}/${signup}`);
  }

  updateUser(user: Users): Observable<message>{
    return this.http.put<message>(`${URL_BACK}/user/update`, user, {withCredentials:true});
  }

  addAddress(address:AddressesData): Observable<message>{
    return this.http.post<message>(`${URL_BACK}/user/addAddress`, address, {withCredentials:true});
  }

  getAddresses(): Observable<AddressesResponse>{
    return this.http.get<AddressesResponse>(`${URL_BACK}/user/getAddresses`, {withCredentials:true});
  }

  updateAddress(address:AddressesData): Observable<message>{
    return this.http.put<message>(`${URL_BACK}/user/updateAddress`, address, {withCredentials:true});
  }

  deleteAddress(id:number): Observable<message>{
    return this.http.delete<message>(`${URL_BACK}/user/deleteAddress/${id}`, {withCredentials:true});
  }

  rPw(userCredentials:UserAuth): Observable<message>{
    return this.http.put<message>(`${URL_BACK}/public/rpw`, userCredentials, {withCredentials:true});
  }

  genders:Enum1[] = [
    {id:'MALE', description: 'Masculino'},
    {id:'FEMALE', description: 'Femenino'},
    {id:'OTHER', description: 'Otro'},
    {id:'UNDEFINED', description: 'Prefiero no decirlo'}
  ];
}
