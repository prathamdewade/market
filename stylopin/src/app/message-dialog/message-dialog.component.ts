import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-message-dialog',
  template: `
     <div class="dialog-header" [ngClass]="getBgClass(data.type)">
      <p class="text-white m-0 text-center py-2">{{ data.type | titlecase }} Message</p>
    </div>
    <mat-dialog-content class="mt-1">
      <p [ngClass]="getTextClass(data.type)">{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end" class="p-0">
      <button mat-button (click)="close()" class="text-danger">Close</button>
    </mat-dialog-actions>
  `,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
})
export class MessageDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string; type: 'success' | 'error' | 'warning' }
  ) {}

  close() {
    this.dialogRef.close();
  }

   getBgClass(type: string): string {
    switch (type) {
      case 'success': return 'bg-success';
      case 'error': return 'bg-danger';
      case 'warning': return 'bg-warning';
      default: return '';
    }
  }

   getTextClass(type: string): string {
    switch (type) {
      case 'success': return 'text-success';
      case 'error': return 'text-danger';
      case 'warning': return 'text-warning';
      default: return '';
    }
  }

}
