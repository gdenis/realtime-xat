import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { JwtModule } from '@auth0/angular-jwt';
import { SocketIoModule } from 'ngx-socket-io';
import { CustomSocket } from './modules/private/sockets/custom-socket';

export function tokenGetter() {
  return localStorage.getItem('nestjs_chat_app');
}

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    SocketIoModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3333'],
      },
    }),
  ],
  declarations: [AppComponent, NavigationComponent],
  providers: [NavigationComponent, CustomSocket],
  bootstrap: [AppComponent],
})
export class AppModule {}
