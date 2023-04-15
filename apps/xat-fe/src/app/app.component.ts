import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from './modules/private/services/chat-service/chat.service';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'realtime-xat-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private subscription: Subscription;
  /**
   *
   */
  constructor(private auth: AuthService, private chatService: ChatService) {
    this.subscription = this.auth.authenicatedSucess$.subscribe(
      (isAuthenticated) => {
        if (isAuthenticated && !this.chatService.IsReady)
          this.chatService.awaitInfoReady().then((ok) => {
            if (ok) console.log('ready');
          });
      }
    );
  }
}
