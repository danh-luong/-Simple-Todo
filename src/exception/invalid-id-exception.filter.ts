import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidIdException extends HttpException {
  constructor() {
    super('Not found id', HttpStatus.NOT_FOUND);
  }
}
