import { Injectable } from "@angular/core";
import { environment } from "apps/xat-fe/src/environments/environment";
import { Socket, SocketIoConfig } from "ngx-socket-io";
import { tokenGetter } from "../../../app.module";



const config: SocketIoConfig = { url: environment.apiUrl, options: {
  extraHeaders: {
    Authorization: tokenGetter() || ''
  }
}
};

@Injectable({
  providedIn: 'root'
})
export class CustomSocket extends Socket {
  constructor(){
    super(config)
  }
}
