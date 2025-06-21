import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [

  {path:'adminComp',component:AdminComponent},
  {path:'userComp', component:UserComponent},
  // {path:'adminComp',component:AppComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {

    anchorScrolling: 'enabled',
    scrollPositionRestoration : 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
