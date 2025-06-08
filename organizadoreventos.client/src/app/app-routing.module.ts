import { Routes } from '@angular/router';
import { EventoListComponent } from './eventos/evento-list/evento-list.component';
import { EventoFormComponent } from './eventos/evento-form/evento-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'eventos', pathMatch: 'full' },
  { path: 'eventos', component: EventoListComponent },
  { path: 'eventos/nuevo', component: EventoFormComponent },
];