import { Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { ConfigServiceService } from '../config-service.service';
import { Validators } from '@angular/forms';
import { IConfig } from '../config.model';
import { Subject, Subscription } from 'rxjs';
@Component({
  selector: 'app-config-inputs',
  templateUrl: './config-inputs.component.html',
  styleUrls: ['./config-inputs.component.css']
})
export class ConfigInputsComponent implements OnInit,OnDestroy  {
  // @Input() controlType: string; maybe we need it for the future

  @Input() formControlName: string;

  @Input() appName: string;

  form: FormGroup = new FormGroup({'configRecords':new FormArray([])});
  
  updateField=new Subject();
  
  configUpdateArr:IConfig[]=[];

  configArr :IConfig[];

  subscriptionArr:Subscription[]=[];

  @Output() formVaildationEvent = new EventEmitter<boolean>();

  constructor(private configService : ConfigServiceService) { }

  ngOnInit(): void {
      
      this.configService.getConfig().then(config => {

        this.configArr = config;
        let configRecords = new FormArray ([]);
        this.configArr.forEach((element:any) => {
        configRecords.push(new FormGroup({
            'configId': new FormControl({value: element.configId , hidden:true}),
            'applicationName': new FormControl({value: element.applicationName , hidden:true}),
            'parameterName': new FormControl({value:element.parameterName ,disabled: true }),
            'parameterValue' : new FormControl(element.parameterValue,{
              updateOn: 'blur',
              validators: [Validators.required]
            })
            })
          );
        });

        this.form = new FormGroup({
          'configRecords': configRecords
        });

        this.onCheckValidity()

        this.onChanges();
      });
     
  }

  onCheckValidity() {
    this.formVaildationEvent.emit(this.form.valid);
  }

  get controls() {
    return (<FormArray>this.form.get('configRecords')).controls;
  }

  getControlValue(control:FormGroup){
    return control.controls.applicationName.value.value;
  }

  getControlLabel(control:FormGroup){
    return control.controls.parameterName.value;
  }

  
  submit(): void {
    console.log(this.configUpdateArr);
    this.configArr = this.configArr
                    .map(configObj => this.configUpdateArr
                    .find(updaedConfigObj => configObj.configId === updaedConfigObj.configId)||configObj);
    
    this.configService.ConfigEvent.next(this.configArr);
    console.log(this.configArr);
    this.configUpdateArr = [];
    this.configService.updateConfigEvent.next(this.configUpdateArr);

  }

  onChanges() {
    this.onCheckValidity();
    this.configService.updateConfigEvent.subscribe((configUpdateArr)=>{
        this.configUpdateArr = configUpdateArr;
    });
    this.configService.ConfigEvent.subscribe((configArr)=>{
        this.configArr = configArr;
    });
    this.controls.forEach((element,index) => {
      if(!this.subscriptionArr[index]){
        this.subscriptionArr[index]= element.valueChanges.subscribe(val => {
          const updatedConfig = {...this.configArr[index],parameterValue:val.parameterValue};
          if(val.parameterValue !== this.configArr[index].parameterValue){
            this.configUpdateArr.push(updatedConfig);
            this.configService.updateConfigEvent.next(this.configUpdateArr);
          }else{
            this.configUpdateArr = this.configUpdateArr.filter(config => config.configId !== updatedConfig.configId);
            this.configService.updateConfigEvent.next(this.configUpdateArr);
          }
         });
      }
      
    });
   return null;
  }

  ngOnDestroy(): void {
    this.subscriptionArr.forEach(elem=>{
      elem.unsubscribe();
    })
  }
 
}
