import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAutorComponent } from './detalle-autor';

describe('DetalleAutor', () => {
  let component: DetalleAutorComponent;
  let fixture: ComponentFixture<DetalleAutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleAutorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleAutorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
