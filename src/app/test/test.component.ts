import { Component, OnInit } from '@angular/core';
import { ConfigServiceService } from './config-service.service';
import { IConfig } from './config.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  applicationNames:string[]=[];

  formValid:boolean = false;

  configUpdateArr:IConfig[]=[];

  configArr :IConfig[];

  constructor(private configService : ConfigServiceService) { }

  ngOnInit(): void {
    this.configService.getConfig().then(config => {
      this.configArr = config;
      const unique = config
      .map((item:IConfig) => item.applicationName)
      .filter((value:string, index:number, array:string[]) => array.indexOf(value) === index)

      this.applicationNames = unique;

      
      
      });

  }

  setFormValid(valid:boolean):void {
    this.formValid = valid;
  }




}
