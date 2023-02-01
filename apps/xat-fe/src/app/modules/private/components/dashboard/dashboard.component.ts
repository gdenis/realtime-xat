import { Component } from '@angular/core';
import { ChatService } from '../../services/chat-service/chat.service';

@Component({
  selector: 'realtime-xat-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  title = this.chatService.getMessage();

  constructor(private chatService: ChatService){}



}
