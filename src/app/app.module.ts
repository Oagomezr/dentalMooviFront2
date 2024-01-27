import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
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
import { ConfirmCodeComponent } from './components/confirm-code/confirm-code.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { VisibilityIconComponent } from './components/category-products/product/visibility-icon/visibility-icon.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { EditPersonalInfoComponent } from './components/user-settings/edit-personal-info/edit-personal-info.component';
import { EditAddressesComponent } from './components/user-settings/edit-addresses/edit-addresses.component';
import { EditAddressComponent } from './components/user-settings/edit-addresses/edit-address/edit-address.component';
import { SelectDepartamentComponent } from './components/user-settings/edit-addresses/edit-address/select-departament/select-departament.component';
import { HoverBoxCartComponent } from './components/header/hover-box-cart/hover-box-cart.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderAdminComponent } from './components/order-admin/order-admin.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CartBadgeComponent,
    SelectGenderComponent,
    PasswordComponent,
    BirthComponent,
    CelPhoneComponent,
    VisibilityIconComponent,
    SelectDepartamentComponent,
    MatIconModule, 
    CategoryProductsComponent,
    ProductsComponent,
    ProductComponent,
    DirectionComponent,
    ConfirmCodeComponent,
    DialogComponent,
    HoverBoxCartComponent,
    HoverBoxProductsComponent,
    HoverBoxProfileComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    PageNotFoundComponent,
    FooterComponent,
    UserSettingsComponent,
    EditPersonalInfoComponent,
    EditAddressesComponent,
    EditAddressComponent,
    OrderDetailsComponent,
    OrderAdminComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
