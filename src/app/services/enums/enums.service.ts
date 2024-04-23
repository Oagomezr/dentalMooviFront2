import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enum1Response } from 'src/app/models/enums/enum1/enum1Response';

@Injectable({
  providedIn: 'root'
})
export class EnumsService {

  private baseUrl = 'http://localhost:8087';
  constructor(private http: HttpClient) {}

  getDepartaments(name:string): Observable<Enum1Response>{
    return this.http.get<Enum1Response>(`${this.baseUrl}/user/departaments/${name}`, {withCredentials:true});
  }

  getMunicipalies(name:string, id:number): Observable<Enum1Response>{
    return this.http.get<Enum1Response>(`${this.baseUrl}/user/municipalies/${name}/${id}`, {withCredentials:true});
  }

  getTiposServicios(): Observable<Enum1Response>{
    return this.http.get<Enum1Response>(`${this.baseUrl}/public/vehiculos/tipoServicio`);
  }

  getServiciosEspeciales(): Observable<Enum1Response>{
    return this.http.get<Enum1Response>(`${this.baseUrl}/public/vehiculos/serviciosEspeciales`);
  }
}
