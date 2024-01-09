import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDepartamentComponent } from './select-departament.component';

describe('SelectDepartamentComponent', () => {
  let component: SelectDepartamentComponent;
  let fixture: ComponentFixture<SelectDepartamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectDepartamentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectDepartamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
