import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './ui/pages/auth/login/login.component';
import { RegisterComponent } from './ui/pages/auth/register/register.component';
import { NotFoundComponent } from './ui/pages/not-found/not-found.component';
import { TextInputComponent } from './ui/components/forms/text-input/text-input.component';
import { SubmitButtonComponent } from './ui/components/forms/submit-button/submit-button.component';
import { ButtonComponent } from './ui/components/forms/button/button.component';
import { HomeComponent } from './ui/pages/home/home.component';
import { FolderComponent } from './ui/components/folder/folder.component';
import { FileComponent } from './ui/components/file/file.component';
import { SideNavComponent } from './ui/components/side-nav/side-nav.component';
import { SideNavHeaderComponent } from './ui/components/side-nav-header/side-nav-header.component';
import { SideNavExplorerComponent } from './ui/components/side-nav-explorer/side-nav-explorer.component';
import { SideNavListItemComponent } from './ui/components/side-nav-list-item/side-nav-list-item.component';
import { DashboardComponent } from './ui/pages/main/dashboard/dashboard.component';
import { SharedComponent } from './ui/pages/main/shared/shared.component';
import { FilesISharedComponent } from './ui/pages/main/files-i-shared/files-i-shared.component';
import { DeletedFilesComponent } from './ui/pages/main/deleted-files/deleted-files.component';
import { StatsCardComponent } from './ui/components/stats-card/stats-card.component';
import { ToolbarComponent } from './ui/components/toolbar/toolbar.component';
import { ExploreComponent } from './ui/pages/main/explore/explore.component';
import { ItemsListComponent } from './ui/components/items-list/items-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogComponent } from './ui/components/dialog/confirm-dialog/confirm-dialog.component';


import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu'; 

import { FileUploadDialogComponent } from './ui/components/dialog/file-upload-dialog/file-upload-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { CreateFolderDialogComponent } from './ui/components/dialog/create-folder-dialog/create-folder-dialog.component';
import { environment } from 'src/environments/environment';
import { FileDetailsComponent } from './ui/components/dialog/file-details/file-details.component';


export function jwtOptionsFactory(cookieService: CookieService) {
  return {
    tokenGetter: () => {
      return cookieService.get('jwt')
    },
    headerName: 'x-auth-token',
    authScheme: '',
    // skipWhenExpired: true,
    disallowedRoutes: [
      environment.apiBaseUrl+'/api/v1/auth/login',
      environment.apiBaseUrl+'/api/v1/auth/register', 
      environment.apiBaseUrl+'/api/v1/auth/*' //Little ambiguous
    ],
    throwNoTokenError: true,
    allowedDomains: ['localhost:8000', 'challenge_api.amadubarry.com']
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    TextInputComponent,
    SubmitButtonComponent,
    ButtonComponent,
    HomeComponent,
    FolderComponent,
    FileComponent,
    SideNavComponent,
    SideNavHeaderComponent,
    SideNavExplorerComponent,
    SideNavListItemComponent,
    DashboardComponent,
    SharedComponent,
    FilesISharedComponent,
    DeletedFilesComponent,
    StatsCardComponent,
    ToolbarComponent,
    ExploreComponent,
    ItemsListComponent,
    ConfirmDialogComponent,
    FileUploadDialogComponent,
    CreateFolderDialogComponent,
    FileDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    JwtModule.forRoot({ jwtOptionsProvider: { provide: JWT_OPTIONS, useFactory: jwtOptionsFactory, deps: [CookieService] } })
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
