import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestclientComponent } from './restclient.component';

describe('RestclientComponent', () => {
  let component: RestclientComponent;
  let fixture: ComponentFixture<RestclientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestclientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
