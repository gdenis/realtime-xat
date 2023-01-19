import { ITest } from '@realtime-xat/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): ITest {
    return { title: 'Welcome to xat-be!' };
  }
}
