import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPersonalInformationComponent } from './get-personal-information.component';

describe('GetPersonalInformationComponent', () => {
  let component: GetPersonalInformationComponent;
  let fixture: ComponentFixture<GetPersonalInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetPersonalInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetPersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
