import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home',component: HomeComponent },
  { path: 'add',component: AddComponent },
  { path: 'edit',component: EditComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' }, //set default to home

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
