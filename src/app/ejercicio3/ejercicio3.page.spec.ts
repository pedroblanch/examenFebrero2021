import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Ejercicio3Page } from './ejercicio3.page';

describe('Ejercicio3Page', () => {
  let component: Ejercicio3Page;
  let fixture: ComponentFixture<Ejercicio3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ejercicio3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Ejercicio3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
