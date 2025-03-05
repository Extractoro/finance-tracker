import { BadRequestException, ValidationError } from '@nestjs/common';

const validationPipesConfig = {
  exceptionFactory: (errors: ValidationError[]) => {
    return new BadRequestException({
      statusCode: 400,
      message: 'Validation failed',
      errors: errors.map((error) => ({
        field: error.property,
        target: error.target,
        property: error.property,
        message: Object.values(error.constraints ?? {})[0],
      })),
    });
  },
};

export default validationPipesConfig;
