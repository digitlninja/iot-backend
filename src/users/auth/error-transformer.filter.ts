import {
  ExceptionFilter,
  Catch,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { v4 as v4UUID } from 'uuid';

@Catch(BadRequestException)
// This transforms Validation error (default of BadRequest by the class-validator library) into an ErrorResult
export class BadRequestTransformer implements ExceptionFilter {
  catch(exception: HttpException) {
    const errorResponse = exception.getResponse() as {
      statusCode: number;
      message: string[];
      error: string;
    };
    return {
      id: v4UUID(),
      path: 'validation',
      messages: errorResponse.message,
      __typename: 'ValidationFailed',
    };
  }
}
