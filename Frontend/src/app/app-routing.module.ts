import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'TicketBooking', loadChildren: () => import('./admin-dashboard/admin-dashboard.module')
      .then(m => m.AdminDashboardModule)
  },
  {
    path: 'user', loadChildren: () => import('./customer-dashboard/customer-dashboard.module')
      .then(m => m.CustomerDashboardModule)
  },
  { path: '**', redirectTo: '/user/movie-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
