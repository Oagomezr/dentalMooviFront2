import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_BACK } from 'src/app/env';
import { Enum1Response } from 'src/app/models/enums/enum1/enum1Response';

@Injectable({
  providedIn: 'root'
})
export class EnumsService {

  constructor(private http: HttpClient) {}

  getDepartaments(name:string): Observable<Enum1Response>{
    return this.http.get<Enum1Response>(`${URL_BACK}/user/departaments/${name}`, {withCredentials:true});
  }

  getMunicipalies(name:string, id:number): Observable<Enum1Response>{
    return this.http.get<Enum1Response>(`${URL_BACK}/user/municipalies/${name}/${id}`, {withCredentials:true});
  }

  getTiposServicios(): Observable<Enum1Response>{
    return this.http.get<Enum1Response>(`${URL_BACK}/public/vehiculos/tipoServicio`);
  }

  getServiciosEspeciales(): Observable<Enum1Response>{
    return this.http.get<Enum1Response>(`${URL_BACK}/public/vehiculos/serviciosEspeciales`);
  }

  getCategories(name:string): Observable<Enum1Response>{
    return this.http.get<Enum1Response>(`${URL_BACK}/admin/categories/${name}`, {withCredentials:true});
  }
}
