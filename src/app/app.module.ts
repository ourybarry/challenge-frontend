import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    FileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
