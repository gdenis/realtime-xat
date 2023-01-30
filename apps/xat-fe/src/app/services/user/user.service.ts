import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from '@realtime-xat/interfaces';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

  private userController = 'api/user/';

  create(user: IUser): Observable<IUser> {
    return this.http
      .post<IUser>(`${this.userController}create-user`, user)
      .pipe(
        tap((createdUser: IUser) =>
          this.snackbar.open(
            `User ${createdUser.username} created successfully`,
            'Close',
            {
              duration: 2000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            }
          )
        ),
        catchError((e) => {
          this.snackbar.open(
            `User could not be created due to: ${e.error.message}`,
            'Close',
            {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            }
          );
          return throwError(() => new Error(e));
        })
      );
  }
}
