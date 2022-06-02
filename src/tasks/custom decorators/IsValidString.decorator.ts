/* eslint-disable prettier/prettier */
import {  IsDefined ,IsNumber, IsOptional, IsString } from "class-validator";
/* eslint-disable prettier/prettier */
export function IsValidString( //!Custom Decorator (For CreateUpdateTask with Relation)
    { required, unique }: ValidationArrayOptions = { 
      // unique: true,
      required: false
    },
  ): PropertyDecorator {
    return function (target: any, propertyKey: string | symbol): void {
      IsString({})(target, propertyKey);
      
      if (required) IsDefined()(target, propertyKey);
      else IsOptional()(target, propertyKey);
    };
  }