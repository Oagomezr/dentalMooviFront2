import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseUrl = 'http://localhost:8087';

  constructor(private http: HttpClient) { }

  getPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/admin/order/${id}`, { responseType: 'blob', withCredentials:true });
  }
}
