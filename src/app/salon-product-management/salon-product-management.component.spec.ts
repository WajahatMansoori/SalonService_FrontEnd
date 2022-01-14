import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonProductManagementComponent } from './salon-product-management.component';

describe('SalonProductManagementComponent', () => {
  let component: SalonProductManagementComponent;
  let fixture: ComponentFixture<SalonProductManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalonProductManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonProductManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
