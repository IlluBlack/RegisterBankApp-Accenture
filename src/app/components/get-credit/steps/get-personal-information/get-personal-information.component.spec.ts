import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPersonalInformationComponent } from './get-personal-information.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { unitTestingModule } from 'src/app/app-modules/unit-testing.module';
import { User, legalAge } from './../../user.model';
import { By } from '@angular/platform-browser';

describe('GetPersonalInformationComponent', () => {
  let component: GetPersonalInformationComponent;
  let fixture: ComponentFixture<GetPersonalInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GetPersonalInformationComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [unitTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetPersonalInformationComponent);
    component = fixture.componentInstance;
    component.id = valuesUser.identification; //@input

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const valuesUser: User = {
    identification: "1234567",
    firstname: "MyNameIs",
    lastname: "MyLastNameIs",
    birthday: "11-03-1996"
  }

  it('should start with showUserRegistered as false', async () => {
    expect(component.showUserRegistered).toBeFalsy();
  });
  it('form should be disable while loading()', async () => {
    component.loading();
    expect(component.personalInformation.enabled).toBeFalsy();
  });
  it('form should be enable after cancelLoading()', async () => {
    component.loading();
    component.cancelLoading();
    expect(component.personalInformation.enabled).toBeTruthy();
  });

  //maxDate, birthday and legalAge function
  it('maxDate input should be at least legalAge years before currentDate', async () => {
    let maxYear = component.maxDate.getFullYear();
    let currentYear = component.currentDate.getFullYear();

    expect(currentYear - maxYear).toBeGreaterThanOrEqual(legalAge);
  });
  it('hasLegalAge() should return true if user was born before maxDate', async () => {
    component.maxDate = new Date(2000, 2, 1);
    component.personalInformation.get("birthday").setValue(new Date(1993, 1, 1));

    expect(component.hasLegalAge()).toBeTruthy();
  });
  it('hasLegalAge() should return false if user was born after maxDate', async () => {
    component.maxDate = new Date(2000, 2, 1);
    component.personalInformation.get("birthday").setValue(new Date(2001, 1, 1));

    expect(component.hasLegalAge()).toBeFalsy();
  });
  it('hasLegalAge() should return true if user turned legalAge yesteday', async () => {
    component.currentDate = new Date(2018, 2, 2);
    component.calculateMaxDateInput();
    component.personalInformation.get("birthday").setValue(new Date(2018 - legalAge, 2, 1));

    expect(component.hasLegalAge()).toBeTruthy();
  });
  it('hasLegalAge() should return false if user is turning legalAge today', async () => {
    component.currentDate = new Date(2018, 2, 2);
    component.calculateMaxDateInput();
    component.personalInformation.get("birthday").setValue(new Date(2018 - legalAge, 2, 2));

    expect(component.hasLegalAge()).toBeFalsy();
  });

  it('should return date with the format DD-MM-YYYY', async () => {
    let date = new Date(1997, 5, 6);
    expect(component.format_DD_MM_YYYY(date)).toEqual("06-06-1997"); //month count starts at zero
  });

  //errors
  it('button should be disable if some field has error required', async () => {
    let attributes = Object.keys(valuesUser);
    let buttonRegister = fixture.debugElement.query(By.css('.btn-register')).nativeElement;

    for (let i = 1; i < attributes.length; i++) {
      component.personalInformation.get(attributes[i]).setValue("");

      fixture.detectChanges();
      expect(component.personalInformation.get(attributes[i]).hasError('required')).toBeTruthy();
      expect(buttonRegister.disabled).toBeTruthy();
    }
  });

  function setInputs(){
    component.personalInformation.get("firstname").setValue(valuesUser.firstname);
    component.personalInformation.get("lastname").setValue(valuesUser.lastname);
    component.personalInformation.get("birthday").setValue(new Date(1996,2,11));
  }

  //setUserData
  it('setUserData() should set userData with the form User and show it', async () => {
    setInputs();
    component.setUserData();
    expect(component.userData).toEqual(valuesUser);

    component.userRegisteredCorrectly();

    expect(component.showUserRegistered).toBeTruthy();
  });

});


