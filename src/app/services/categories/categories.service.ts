import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_BACK } from 'src/app/env';
import { CategoriesResponse } from 'src/app/models/categories/categoriesResponse';
import { message } from 'src/app/models/message';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoriesResponse>{
    return this.http.get<CategoriesResponse>(`${URL_BACK}/public/categories`);
  }

  updateCategoryName(categoryName: string, newName: string): Observable<message>{
    return this.http.put<message>(`${URL_BACK}/admin/categories/updateName/${categoryName}`, newName, {withCredentials:true});
  }

  updateCategoryLocation(categoryName: string, newName: string): Observable<message>{
    return this.http.put<message>(`${URL_BACK}/admin/categories/updateLocation/${categoryName}`, newName, {withCredentials:true});
  }

  createCategory(parentCategoryName: string, newCategoryName: string): Observable<message>{
    return this.http.post<message>(`${URL_BACK}/admin/categories/create/${parentCategoryName}`, newCategoryName, {withCredentials:true});
  }

  deleteCategory(categoryName: string): Observable<message>{
    return this.http.delete<message>(`${URL_BACK}/admin/categories/delete/${categoryName}`, {withCredentials:true});
  }
}
