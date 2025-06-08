import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component'; 

@Component({
  selector: 'app-root',
  standalone: true, 

  imports: [
    RouterOutlet, 
    EventListComponent 
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OrganizadorEventos.client';
}
