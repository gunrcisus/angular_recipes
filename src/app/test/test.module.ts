import { ANIMATION_MODULE_TYPE, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import {MatTabsModule} from '@angular/material/tabs';
import { ConfigInputsComponent } from './config-inputs/config-inputs.component';


@NgModule({
  declarations: [
    TestComponent,
    ConfigInputsComponent,
  ],
  imports: [
    MatTabsModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        {path:'' , component:TestComponent }
    ])
  ],
  // providers: [{ provide: ANIMATION_MODULE_TYPE, useValue: 'NoopAnimations' }] 
})
export class TestModule { }
