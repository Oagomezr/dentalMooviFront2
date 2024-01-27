import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesResponse } from 'src/app/models/categories/categoriesResponse';
import { message } from 'src/app/models/message';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseUrl = 'http://localhost:8087';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoriesResponse>{
    return this.http.get<CategoriesResponse>(`${this.baseUrl}/public/categories`);
  }

  updateCategoryName(categoryName: string, newName: string): Observable<message>{
    return this.http.put<message>(`${this.baseUrl}/admin/categories/updateName/${categoryName}`, newName, {withCredentials:true});
  }

  updateCategoryLocation(categoryName: string, newName: string): Observable<message>{
    return this.http.put<message>(`${this.baseUrl}/admin/categories/updateLocation/${categoryName}`, newName, {withCredentials:true});
  }

  createCategory(parentCategoryName: string, newCategoryName: string): Observable<message>{
    return this.http.post<message>(`${this.baseUrl}/admin/categories/create/${parentCategoryName}`, newCategoryName, {withCredentials:true});
  }

  deleteCategory(categoryName: string): Observable<message>{
    return this.http.delete<message>(`${this.baseUrl}/admin/categories/delete/${categoryName}`, {withCredentials:true});
  }
}
