import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetProductComponent } from './set-product.component';

describe('SetProductComponent', () => {
  let component: SetProductComponent;
  let fixture: ComponentFixture<SetProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
