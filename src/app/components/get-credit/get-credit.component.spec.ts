import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GetCreditComponent } from './get-credit.component';
import { GetPersonalInformationComponent } from './steps/get-personal-information/get-personal-information.component';
import { By } from '@angular/platform-browser';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { unitTestingModule } from 'src/app/app-modules/unit-testing.module';

describe('GetCreditComponent', () => {
  let component: GetCreditComponent;
  let fixture: ComponentFixture<GetCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GetCreditComponent, GetPersonalInformationComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [unitTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCreditComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should start with validID as false', async () => {
    expect(component.validID).toBeFalsy();
  });
  it('control should be disable while loading()', async () => {
    component.loading();

    expect(component.identification.enabled).toBeFalsy();
  });
  it('control should be enable after cancelLoading()', async () => {
    component.loading();
    component.cancelLoading();

    expect(component.identification.enabled).toBeTruthy();
  });

  //Control Identification
  it('validID should be false if identification is string', async () => {
    component.identification.setValue("my identification");
    component.validateUser();

    expect(component.isIDNumber()).toBeFalsy();
    expect(component.isIDInteger()).toBeFalsy();
    expect(component.validID).toBeFalsy();
  });
  it('should return true if identification is a number', async () => {
    component.identification.setValue(123450);

    expect(component.isIDNumber()).toBeTruthy();
    expect(component.isIDInteger()).toBeTruthy();
  });
  it('should return true if identification is a number of type string', async () => {
    component.identification.setValue("123450");

    expect(component.isIDNumber()).toBeTruthy();
    expect(component.isIDInteger()).toBeTruthy();
  });
  it('validID should be false if identification is not an integer', async () => {
    component.identification.setValue(12345.5);

    expect(component.isIDNumber()).toBeTruthy();
    expect(component.isIDInteger()).toBeFalsy();
    expect(component.validID).toBeFalsy();
  });

  //errors
  it('button should be disable if control has error required', async () => {
    component.identification.setValue("");
    let button = fixture.debugElement.query(By.css('button')).nativeElement;

    fixture.detectChanges();
    expect(component.identification.hasError('required')).toBeTruthy();
    expect(button.disabled).toBeTruthy();
  });

});
