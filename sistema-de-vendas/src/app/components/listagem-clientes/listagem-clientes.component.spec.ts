import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemClientesComponent } from './listagem-clientes.component';

describe('ListagemClientesComponent', () => {
  let component: ListagemClientesComponent;
  let fixture: ComponentFixture<ListagemClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemClientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
