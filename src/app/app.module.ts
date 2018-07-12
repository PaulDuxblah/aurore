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
import { StudentComponent } from './logged/student/student.component';
import { AddComponent } from './logged/student/add/add.component';
import { AllComponent } from './logged/student/all/all.component';
import { EditComponent } from './logged/student/edit/edit.component';

const appRoutes: Routes = [
  { path: '', component: AuthComponent },
  { 
    path: 'admin', 
    component: LoggedComponent, 
    children: [
      {
        path: 'students', 
        component: StudentComponent, 
        children: [
          { path: 'add', component: AddComponent },
          { path: 'all', component: AllComponent },
          { path: 'edit/:id', component: EditComponent },
        ]
      },
      { path: '**', redirectTo: '' }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoggedComponent,
    StudentComponent,
    AddComponent,
    AllComponent,
    EditComponent
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
