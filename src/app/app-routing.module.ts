import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './services/auth/guard.guard';
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [GuardGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'view',
    loadChildren: () =>
      import('./view/view.module').then((m) => m.ViewPageModule),
    canActivate: [GuardGuard],
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then((m) => m.AddPageModule),
    canActivate: [GuardGuard],
  },
  {
    path: 'view-flower',
    loadChildren: () => import('./view-flower/view-flower.module').then( m => m.ViewFlowerPageModule)
  },
  {
    path: 'add-flower',
    loadChildren: () => import('./add-flower/add-flower.module').then( m => m.AddFlowerPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
