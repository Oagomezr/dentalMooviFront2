import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CPW } from 'src/app/models/cPw';
import { message } from 'src/app/models/message';
import { UserAuth } from 'src/app/models/userAuth';
import { URL_BACK } from '../../env';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  private count: number = 0;

  constructor(private http: HttpClient) {}

  login(userAuth: UserAuth): Observable<any> {
    return this.http.post<any>(`${URL_BACK}/public/login`, userAuth, {withCredentials:true});
  }

  checkRole(userAuth: UserAuth): Observable<any> {
    return this.http.post<any>(`${URL_BACK}/public/isAuthorized`, userAuth, {withCredentials:true});
  }

  logout() {
    return this.http.delete(`${URL_BACK}/public/logout`, {withCredentials:true});
  }
  
  uPw(data:CPW, ref:string): Observable<message>{
    return this.http.put<message>(`${URL_BACK}/user/upw/${ref}`, data, {withCredentials:true});
  }

  logoutAction(){
    this.logout().subscribe({
      next: () => {
        console.log("Logout complete");
        localStorage.clear();
        window.location.reload();
      },
      error: error => {
        console.error('Error in logout:', error);
      }
    });
  }
  
  errorCount(){
    this.count +=1;
    if(this.count > 2){
      this.logoutAction();
      this.count = 0;
      window.location.reload();
    }
  }
}
