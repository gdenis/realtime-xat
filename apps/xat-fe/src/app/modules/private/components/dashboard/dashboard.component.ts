import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat-service/chat.service';

@Component({
  selector: 'realtime-xat-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  rooms$ = this.chatService.getMyRooms();

  subscription?: Subscription;

  constructor(private chatService: ChatService) {}


  ngOnInit(): void {
   this.subscription = this.chatService.createRoom();
  }

  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe();
  }


}
