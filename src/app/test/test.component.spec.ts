import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ConfigInputsComponent } from './config-inputs/config-inputs.component';
import { ConfigServiceService } from './config-service.service';
import {configTest} from '../../assets/configsTest';
import { TestComponent } from './test.component';

describe('TestComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  const config = configTest;

  let mock = {
    getConfig : jest.fn().mockResolvedValue(config)
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [  TestComponent,
        ConfigInputsComponent,],
      imports: [
        MatTabsModule,
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path:'' , component:TestComponent }
        ])
      ],providers: [{provide:ConfigServiceService ,useValue: mock}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
     component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.applicationNames.length).toBe(2);
  });
});
