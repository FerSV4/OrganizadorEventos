import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisEventosCreadosComponent } from './mis-eventos-creados.component';

xdescribe('MisEventosCreadosComponent', () => {
  let component: MisEventosCreadosComponent;
  let fixture: ComponentFixture<MisEventosCreadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MisEventosCreadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisEventosCreadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
