import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({providedIn: 'root'})
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }

  //////////////////////////////////////////////////////////
  //                   alerts
  //////////////////////////////////////////////////////////

  success(message: string): void {
    this.openSnackBar(message, 3000);
  }

  info(message: string): void {
    this.openSnackBar(message, 3000);
  }

  warn(message: string): void {
    this.openSnackBar(message, 0, 'ok');
  }

  error(message: string): void {
    this.openSnackBar(message, 0, 'ok');
  }

  //////////////////////////////////////////////////////////
  //                   tipps
  //////////////////////////////////////////////////////////

  tip(message: string): void {
    this.openSnackBar(message, 0, 'ok');
  }

  openSnackBar(message: string, duration: number, action?: string): void {
    console.log('AlertService openSnackBar: ', message, duration, action)
    const matSnackBarRef = this.snackBar.open(message, action,
      {
        duration,
        horizontalPosition: 'end'
      });
    matSnackBarRef.onAction().subscribe(() => {
      matSnackBarRef.dismiss();
    });
  }

  closeSnackBar(): void {
    this.snackBar.dismiss();
  }

}
