import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaComponent } from './cuenta.component';

xdescribe('CuentaComponent', () => {
  let component: CuentaComponent;
  let fixture: ComponentFixture<CuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
