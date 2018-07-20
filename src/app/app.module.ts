// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Services
import { ApiService } from './services/api.service';

// Components
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoggedComponent } from './logged/logged.component';
import { StudentComponent } from './logged/student/student.component';
import { StudentFormComponent } from './logged/student/form/form.component';
import { StudentAllComponent } from './logged/student/all/all.component';
import { StudentAddComponent } from './logged/student/add/add.component';
import { StudentEditComponent } from './logged/student/edit/edit.component';

// Models
import { Admin } from './models/admin.model';
import { Address } from './models/address.model';
import { Person } from './models/person.model';
import { Student } from './models/student.model';

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
    StudentComponent,
    StudentAddComponent,
    StudentAllComponent,
    StudentEditComponent,
    StudentFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [
    ApiService,
    StudentFormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
