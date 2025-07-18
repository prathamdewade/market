import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateAboutComponent } from './manage/update-about/update-about.component';
import { UpdateBannerComponent } from './manage/update-banner/update-banner.component';
import { UpdateBuyNowComponent } from './manage/update-buy-now/update-buy-now.component';
import { UpdateContactComponent } from './manage/update-contact/update-contact.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

export const routes: Routes = [
    {path:"", component:ProductListComponent},
    {path:"Home", component:ProductListComponent},
    {path:"Dashboard", component:DashboardComponent},
    {path:"About", component:UpdateAboutComponent},
    {path:"Banner", component:UpdateBannerComponent},
    {path:"Product", component:DashboardComponent},
    {path:"BuyNow", component:UpdateBuyNowComponent},
    {path:"Login", component:LoginComponent},
    {path:"ContactUS", component:UpdateContactComponent},
    {path: '**',component: PagenotfoundComponent,
  },
];
