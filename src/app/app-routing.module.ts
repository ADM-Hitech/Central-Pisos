import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./main/content/authentication/authentication.module').then(module => module.AuthenticationModule)
  },
  {
    path: 'nosotros',
    loadChildren: () => import('./main/content/about-us/about-us.module').then(module => module.AboutUsModule)
  },
  {
    path: 'sucursales',
    loadChildren: () => import('./main/content/branch-offices/branch-office.module').then(module => module.BranchOfficesModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./main/content/contact/contact.module').then(module => module.ContactModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./main/content/products/product.module').then(module => module.ProductModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./main/content/car/car.module').then(module => module.CarModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./main/content/profile/profile.modules').then(module => module.ProfileModule)
  },
  {
    path: '',
    loadChildren: () => import('./main/content/home/home.module').then(module => module.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
