import { Component } from '@angular/core';
import { ITest } from '@realtime-xat/interfaces';
import { Observable } from 'rxjs';
import { TestService } from './services/test-service/test.service';

@Component({
  selector: 'realtime-xat-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  testValue: Observable<ITest> = this.service.getTest();

  /**
   *
   */
  constructor(private service: TestService) {}
}
