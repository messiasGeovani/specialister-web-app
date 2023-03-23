import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { RegistrationGuard } from './modules/registration/guards/registration.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./modules/registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
    canActivate: [AuthenticationGuard],
    canMatch: [RegistrationGuard],
  },
  {
    path: 'feed',
    loadChildren: () =>
      import('./modules/registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
    canActivate: [AuthenticationGuard],
    canMatch: [AuthenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
