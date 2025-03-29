import { ValidationError } from '@nestjs/common';

export function processErrors(errors: ValidationError[]) {
  return errors.map((err) => ({
    field: err.property,
    messages: Object.values(err.constraints || {}),
    ...(err.children && err.children.length > 0
      ? { children: processErrors(err.children) }
      : {}),
  }));
}
