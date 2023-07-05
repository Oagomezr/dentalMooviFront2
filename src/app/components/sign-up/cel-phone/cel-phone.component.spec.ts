import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelPhoneComponent } from './cel-phone.component';

describe('CelPhoneComponent', () => {
  let component: CelPhoneComponent;
  let fixture: ComponentFixture<CelPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CelPhoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CelPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
