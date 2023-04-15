import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ILoginResponse, ILoginUserDto } from '@realtime-xat/interfaces';
import { AsyncSubject, BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userController = 'api/user/';
  public authenicatedSucess$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

  login(user: ILoginUserDto): Observable<ILoginResponse> {
    return this.http
      .post<ILoginResponse>(`${this.userController}login`, user)
      .pipe(
        tap((res: ILoginResponse) => {
          localStorage.setItem('nestjs_chat_app', res.access_token);
          this.authenicatedSucess$.next(true);
        }),
        tap(() =>
          this.snackbar.open(`Login successfully`, 'Close', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          })
        )
      );
  }
}
