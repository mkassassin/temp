import { Component } from '@angular/core';
import {
	MatDialog,
	MatDialogRef,
	MatDialogActions,
	MatDialogClose,
	MatDialogTitle,
	MatDialogContent,
 } from '@angular/material/dialog';
 import {MatButtonModule} from '@angular/material/button';

@Component({
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './CancelModelRunDialog.component.html',
  styleUrl: './CancelModelRunDialog.component.css'
})
export class CancelModelRunDialogComponent {
	constructor(public dialogRef: MatDialogRef<CancelModelRunDialogComponent>) {}
}
