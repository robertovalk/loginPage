import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultPaginaLoginComponent } from './default-pagina-login.component';

describe('DefaultPaginaLoginComponent', () => {
  let component: DefaultPaginaLoginComponent;
  let fixture: ComponentFixture<DefaultPaginaLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultPaginaLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultPaginaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
