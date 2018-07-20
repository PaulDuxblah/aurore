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
import { PersonComponent } from './logged/person/person.component';
import { PersonAddComponent } from './logged/person/add/add.component';
import { PersonAllComponent } from './logged/person/all/all.component';
import { PersonEditComponent } from './logged/person/edit/edit.component';
import { PersonFormComponent } from './logged/person/form/form.component';
import { StudentComponent } from './logged/student/student.component';
import { StudentFormComponent } from './logged/student/form/form.component';
import { StudentAllComponent } from './logged/student/all/all.component';
import { StudentAddComponent } from './logged/student/add/add.component';
import { StudentEditComponent } from './logged/student/edit/edit.component';



const appRoutes: Routes = [
  { path: '', component: AuthComponent },
  { 
    path: 'admin',
    component: LoggedComponent, 
    children: [
      {
        path: 'persons',
        component: PersonComponent,
        children: [
          { path: '', component: PersonAllComponent },
          { path: 'add', component: PersonAddComponent },
          { path: 'edit/:id', component: PersonEditComponent },
        ]
      },
      {
        path: 'students', 
        component: StudentComponent, 
        children: [
          { path: '', component: StudentAllComponent },
          { path: 'add', component: StudentAddComponent },
          { path: 'edit/:id', component: StudentEditComponent },
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
    PersonComponent,
    PersonAddComponent,
    PersonAllComponent,
    PersonEditComponent,
    PersonFormComponent,
    StudentComponent,
    StudentAddComponent,
    StudentAllComponent,
    StudentEditComponent,
    StudentFormComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [AdminService, StudentService, StudentFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
