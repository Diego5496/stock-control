import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordHomeComponent } from './dashbord-home.component';

describe('DashbordHomeComponent', () => {
  let component: DashbordHomeComponent;
  let fixture: ComponentFixture<DashbordHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
