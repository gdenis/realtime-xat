import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat-service/chat.service';

@Component({
  selector: 'realtime-xat-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  rooms$ = this.chatService.getMyRooms();
  selectedRoom = null;
  userReady = false;

  subscription: Subscription = new Subscription();

  constructor(private chatService: ChatService) {}

  ngAfterViewInit(): void {
    if (this.chatService.IsReady) this.chatService.emitPaginateRooms(10, 0);
  }

  onSelectRoom(event: MatSelectionListChange) {
    this.selectedRoom = event.source.selectedOptions.selected[0].value;
  }

  ngOnInit() {
    this.chatService.awaitInfoReady().then((ready) => {
      if (ready) this.chatService.emitPaginateRooms(10, 0);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onPaginateRooms(event: PageEvent) {
    this.chatService.emitPaginateRooms(event.pageSize, event.pageIndex);
  }
}
