import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtResponse } from 'src/app/models/jwtResponse';
import { UserAuth } from 'src/app/models/userAuth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  private baseUrl = 'http://localhost:8087';

  constructor(private http: HttpClient) {}

  login(userAuth: UserAuth): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.baseUrl}/public/authenticate`, userAuth);
  }
}
