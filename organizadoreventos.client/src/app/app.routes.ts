import { Routes } from '@angular/router';
import { EventoListComponent } from './eventos/evento-list/evento-list.component';
import { EventoFormComponent } from './eventos/evento-form/evento-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MisEventosComponent } from './components/mis-eventos/mis-eventos.component';
import { MisEventosCreadosComponent } from './components/mis-eventos-creados/mis-eventos-creados.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';

//ROUTER para cumplir el requerimiento de SPA   
export const routes: Routes = [
    { path: '', redirectTo: '/eventos', pathMatch: 'full' },
    { path: 'eventos', component: EventoListComponent },
    { path: 'eventos/nuevo', component: EventoFormComponent },
    { path: 'eventos/editar/:id', component: EventoFormComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'mis-eventos', component: MisEventosComponent },
    { path: 'mis-eventos-creados', component: MisEventosCreadosComponent },
    { path: 'cuenta', component: CuentaComponent },
    { path: 'favoritos', component: FavoritosComponent },
];