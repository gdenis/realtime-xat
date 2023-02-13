import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat-service/chat.service';

@Component({
  selector: 'realtime-xat-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  rooms$ = this.chatService.getMyRooms();

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.creareRoom();
  }
}
