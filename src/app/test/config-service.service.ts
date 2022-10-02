import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IConfig } from './config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService { 
  public updateConfigEvent:Subject<any> = new Subject();
  public ConfigEvent:Subject<any> = new Subject();
  constructor() { }
  
  async getConfig():Promise<IConfig[]>{
    const res = await fetch('../../assets/configs.json');
    const jsonData = await res.json();
    return jsonData;
  }
  
}
