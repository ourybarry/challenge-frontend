import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './service/auth/auth-guard.guard';
import { LoginComponent } from './ui/pages/auth/login/login.component';
import { RegisterComponent } from './ui/pages/auth/register/register.component';
import { HomeComponent } from './ui/pages/home/home.component';
import { DashboardComponent } from './ui/pages/main/dashboard/dashboard.component';
import { DeletedFilesComponent } from './ui/pages/main/deleted-files/deleted-files.component';
import { ExploreComponent } from './ui/pages/main/explore/explore.component';
import { FilesISharedComponent } from './ui/pages/main/files-i-shared/files-i-shared.component';
import { SharedComponent } from './ui/pages/main/shared/shared.component';
import { NotFoundComponent } from './ui/pages/not-found/not-found.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuardGuard], children: [
      { path: '', redirectTo: 'explore', pathMatch: 'full' },
      // { path: 'dashboard', component: DashboardComponent },
      { path: 'explore', component: ExploreComponent},
      // { path: 'shared-with-me', component: SharedComponent},
      // { path: 'files-i-shared', component: FilesISharedComponent},
      { path: 'trash', component: DeletedFilesComponent}
    ]
  },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
