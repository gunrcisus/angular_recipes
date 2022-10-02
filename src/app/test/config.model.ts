export type ConfigValueType = string | boolean | number;

export interface IConfig {
    configId: number;
    applicationName: string;
    parameterName: string;
    parameterValue: ConfigValueType;
}

export type ConfigRequest = Pick<IConfig, 'applicationName' | 'parameterName'>;