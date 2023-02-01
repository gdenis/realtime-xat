import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { JwtModule } from '@auth0/angular-jwt';
import { SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';

export function tokenGetter() {
  return localStorage.getItem('nestjs_chat_app');
}

const config: SocketIoConfig = {
  url: environment.apiUrl,
  options: {
    extraHeaders: {
      Authorization: tokenGetter() || '',
    },
  },
};

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3333'],
      },
    }),
  ],
  declarations: [AppComponent, NavigationComponent],
  providers: [NavigationComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
