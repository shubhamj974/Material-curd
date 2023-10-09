import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDashboardComponent } from './shared/component/post-dashboard/post-dashboard.component';

const routes: Routes = [
  { path: '', component: PostDashboardComponent },
  { path: 'home', component: PostDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
