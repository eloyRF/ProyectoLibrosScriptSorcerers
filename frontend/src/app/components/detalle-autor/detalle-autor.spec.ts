import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAutor } from './detalle-autor';

describe('DetalleAutor', () => {
  let component: DetalleAutor;
  let fixture: ComponentFixture<DetalleAutor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleAutor],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleAutor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
