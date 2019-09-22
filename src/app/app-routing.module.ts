import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './components/menu/menu.component';
import { GetCreditComponent } from './components/get-credit/get-credit.component';
import { GetPersonalInformationComponent } from './components/get-credit/steps/get-personal-information/get-personal-information.component';

const routes: Routes = [
  {
    path: 'user', component: MenuComponent, children: [
      { path: 'credit', component: GetCreditComponent }
    ]
  },


  { path: '**', redirectTo: 'user', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
