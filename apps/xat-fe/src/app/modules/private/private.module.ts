import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialModule } from '../../material.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, PrivateRoutingModule, MaterialModule],
})
export class PrivateModule {}
