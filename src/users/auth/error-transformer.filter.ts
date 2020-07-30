import {
  ExceptionFilter,
  Catch,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { v4 as v4UUID } from 'uuid';

@Catch(BadRequestException)
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
