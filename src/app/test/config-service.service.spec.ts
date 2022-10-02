import { TestBed } from '@angular/core/testing';
import { ConfigServiceService } from './config-service.service';
import {configTest} from '../../assets/configsTest';
describe('ConfigServiceService', () => {
  let service: ConfigServiceService;
  const config = configTest;
  
  beforeEach( () => {
      TestBed.configureTestingModule({ 
      providers: [{provide:ConfigServiceService , useValue: config}]
      });
    service = TestBed.inject(ConfigServiceService);
    service.getConfig = jest.fn().mockResolvedValue(config);


  });

  it("should create the config service", () => {
    expect(service).toBeTruthy();

  });
  

  it('element should return an array of objects and the object needs to contain configId', async() => {
    const configArr = await service.getConfig();
    expect(configArr.length).not.toEqual(0);
    expect(Object.keys(configArr[0])).toContain('configId');
   
  });



 
});
