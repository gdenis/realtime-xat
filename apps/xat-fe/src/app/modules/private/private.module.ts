import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialModule } from '../../material.module';
import { CreateRoomComponent } from './components/create-room/create-room.component';

@NgModule({
  declarations: [DashboardComponent, CreateRoomComponent],
  imports: [CommonModule, PrivateRoutingModule, MaterialModule],
  providers: [],
})
export class PrivateModule {}
