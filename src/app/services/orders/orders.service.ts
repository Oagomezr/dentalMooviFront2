import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_BACK } from 'src/app/env';
import { OrderResponse } from 'src/app/models/orders/ordersResponse';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  isAdmin: boolean = localStorage.getItem('isAdmin') != null;
  access: string = this.isAdmin ? "admin" : "public";

  constructor(private http: HttpClient) { }

  getPdf(id: number): Observable<Blob> {
    return this.http.get(`${URL_BACK}/${this.access}/order/${id}`, { responseType: 'blob', withCredentials:true });
  }
  
  getPdfsList(status:string, orderBy:boolean):  Observable<OrderResponse>{
    return this.http.get<OrderResponse>(`${URL_BACK}/admin/order/${status}/${orderBy}`, { withCredentials:true });
  }
}
