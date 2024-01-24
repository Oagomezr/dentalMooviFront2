import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AdminComponent } from './components/admin/admin.component';
import { CategoryProductsComponent } from './components/category-products/category-products.component';
import { ProductComponent } from './components/category-products/product/product.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { EditPersonalInfoComponent } from './components/user-settings/edit-personal-info/edit-personal-info.component';
import { EditAddressesComponent } from './components/user-settings/edit-addresses/edit-addresses.component';
import { EditAddressComponent } from './components/user-settings/edit-addresses/edit-address/edit-address.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderAdminComponent } from './components/order-admin/order-admin.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'category/:parents', component: CategoryProductsComponent},
  { path: 'product/:product', component: ProductComponent},
  { path: 'settings', component: UserSettingsComponent },
  { path: 'settings/userInfo', component: EditPersonalInfoComponent },
  { path: 'settings/addresses', component: EditAddressesComponent },
  { path: 'settings/addresses/address', component: EditAddressComponent },
  { path: 'orderDetails', component: OrderDetailsComponent },
  { path: 'orderAdmin', component: OrderAdminComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
