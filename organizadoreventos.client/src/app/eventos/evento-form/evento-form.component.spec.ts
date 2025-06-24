import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EventoFormComponent } from './evento-form.component';
import { EventoService } from '../evento.service';
import { AuthService } from '../../services/auth.service';

describe('EventoFormComponent', () => {
  let component: EventoFormComponent;
  let fixture: ComponentFixture<EventoFormComponent>;

  // Mocks para los servicios que el componente necesita en su constructor
  let eventoMock: jasmine.SpyObj<EventoService>;
  let authMock: jasmine.SpyObj<AuthService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const espiaEventoService = jasmine.createSpyObj('EventoService', ['getEvento', 'updateEvento', 'createEvento']);
    const espiaAuthService = jasmine.createSpyObj('AuthService', ['getUsuarioLogueado']);
    const espiaRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        EventoFormComponent,
        ReactiveFormsModule
      ],
      providers: [
        // Probando los mocks en lugar de los servicios de verdad
        { provide: EventoService, useValue: espiaEventoService },
        { provide: AuthService, useValue: espiaAuthService },
        { provide: Router, useValue: espiaRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => null } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EventoFormComponent);
    component = fixture.componentInstance;

    

    

    eventoMock = TestBed.inject(EventoService) as jasmine.SpyObj<EventoService>; // Refecerencias para los mocks
    authMock = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    component.ngOnInit();
  });

  // Prueba..........
  it('Debe marcar el formulario como inválido si la fecha de fin es anterior a la fecha de inicio', () => {
    const form = component.formularioEvento;


    form.get('fecha')?.setValue('2025-10-26T12:00');
    form.get('fechaFin')?.setValue('2025-10-25T12:00');

    //Verificando el error,,,,,,,,
    expect(form.hasError('FechaInvalida')).toBe(true);
  });

  it('Debe marcar el formulario como válido si la fecha de fin es posterior a la fecha de inicio', () => {
    const form = component.formularioEvento;
    
    form.get('fecha')?.setValue('2025-10-26T12:00');
    form.get('fechaFin')?.setValue('2025-10-27T12:00');



    expect(form.hasError('FechaInvalida')).toBe(false);
  });
});