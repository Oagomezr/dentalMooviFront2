import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/home/footer/footer.component';
import { BodyComponent } from './components/home/body/body.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CartBadgeComponent } from './components/header/cart-badge/cart-badge.component';
import { SelectGenderComponent } from './components/sign-up/select-gender/select-gender.component';
import { PasswordComponent } from './components/password-field/password.component';
import { BirthComponent } from './components/sign-up/birth/birth.component';
import { CelPhoneComponent } from './components/sign-up/cel-phone/cel-phone.component';
import { HoverBoxProfileComponent } from './components/header/hover-box-profile/hover-box-profile.component';
import { HoverBoxProductsComponent } from './components/header/hover-box-products/hover-box-products.component';
import { CategoryProductsComponent } from './components/category-products/category-products.component';
import { ProductsComponent } from './components/category-products/products/products.component';
import { ProductComponent } from './components/category-products/product/product.component';
import { DirectionComponent } from './components/category-products/direction/direction.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'category/:parents', component: CategoryProductsComponent},
  { path: 'product/:product', component: ProductComponent},
  { path: '**', component: PageNotFoundComponent },
  
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    LoginComponent,
    SignUpComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    HoverBoxProfileComponent,
    HoverBoxProductsComponent,
    CategoryProductsComponent,
    ProductsComponent,
    ProductComponent,
    DirectionComponent,
    
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CartBadgeComponent,
    SelectGenderComponent,
    PasswordComponent,
    BirthComponent,
    CelPhoneComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
