import { Routes } from '@angular/router';
import { MisEventosComponent } from './components/mis-eventos/mis-eventos.component';
import { EventoFormComponent } from './eventos/evento-form/evento-form.component';
import { EventoListComponent } from './eventos/evento-list/evento-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MisEventosCreadosComponent } from './components/mis-eventos-creados/mis-eventos-creados.component';


//ROUTER para cumplir el requerimiento de SPA   
export const routes: Routes = [ 
  { path: 'eventos', component: EventoListComponent },
  { path: 'eventos/nuevo', component: EventoFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'mis-eventos', component: MisEventosComponent },
  { path: 'mis-eventos-creados', component: MisEventosCreadosComponent },

  { path: 'register', component: RegisterComponent },

  { path: '', redirectTo: '/eventos', pathMatch: 'full' },

  { path: '**', redirectTo: '/eventos' }
  
];