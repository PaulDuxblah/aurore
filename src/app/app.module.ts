import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';

import { AdminService } from './services/admin.service';
import { StudentService } from './services/student.service';
import { LoggedComponent } from './logged/logged.component';

const appRoutes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'admin', component: LoggedComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoggedComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [AdminService, StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
