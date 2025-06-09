import { Routes } from '@angular/router';
    
import { EventoFormComponent } from './eventos/evento-form/evento-form.component';
import { EventoListComponent } from './eventos/evento-list/evento-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: 'eventos', component: EventoListComponent },
  { path: 'eventos/nuevo', component: EventoFormComponent },
  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  { path: '', redirectTo: '/eventos', pathMatch: 'full' },

  { path: '**', redirectTo: '/eventos' }
];