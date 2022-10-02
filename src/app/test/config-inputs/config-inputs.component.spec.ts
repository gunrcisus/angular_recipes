import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConfigServiceService } from '../config-service.service';
import { ConfigInputsComponent } from './config-inputs.component';
import {configTest} from '../../../assets/configsTest';


describe('Component: config inputs', () => {

  let component: ConfigInputsComponent;
  let fixture: ComponentFixture<ConfigInputsComponent>;
  const config = configTest;
  let mock = {
    getConfig: jest.fn().mockResolvedValue(config)
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ConfigInputsComponent],
      providers: [
        {
          provide: ConfigServiceService,
          useValue: mock
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('form control contains parameter value as expected', () => {
    let parameterValue = component.form.value['configRecords'][0].parameterValue;
    expect(parameterValue).toBe(config[0].parameterValue);
  });

  it('form shold be valid after populating inputs', () => {
    expect(component.controls[0].valid).toBeTruthy();
  });

  it('should yeild a general application name', () => {
    expect(component.getControlValue(<FormGroup>component.controls[0])).toBe('general');
  });
  it('should yeild a sample_cohort parameter name', () => {
    expect(component.getControlLabel(<FormGroup>component.controls[0])).toBe('sample_cohort');
  });

  it('should yeild an empty array after submiting without changing the value', () => {
    component.submit();
    expect(component.configUpdateArr.length).toBe(0);
  })

});