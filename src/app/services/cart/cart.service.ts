import { Injectable } from '@angular/core';
import { CartResponse } from 'src/app/models/cart/cartResponse';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartResponse: CartResponse = { data: [], total:0, amountOfProducts:0};
}
