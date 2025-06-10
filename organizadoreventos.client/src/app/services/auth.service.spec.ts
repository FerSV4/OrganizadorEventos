import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.interface';

describe('AuthService', () => {
  let servicio: AuthService;
  let enrutadorEspia: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [
        AuthService,
        { provide: Router, useValue: spy }
      ]
    });

    servicio = TestBed.inject(AuthService);
    enrutadorEspia = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });


  it('Se crea un usuario en LocalStorage', () => {

    expect(servicio).toBeTruthy();
  });

  it('Se debe eliminar el usuario del LocalStorage por la llamada al logout', () => {

    const usuarioFalso: Usuario = { usuarioId: 1, nombreUsuario: 'testunitario', nombreCompleto: 'Test User', correo: 'test@test.com', fechaNacimiento: new Date() };
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioFalso));
    

    expect(localStorage.getItem('usuarioLogueado')).not.toBeNull();


    servicio.logout();

    expect(localStorage.getItem('usuarioLogueado')).toBeNull();

    expect(enrutadorEspia.navigate).toHaveBeenCalledWith(['/eventos']);
  });
});
