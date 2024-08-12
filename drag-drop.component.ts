import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { DragDropFileUploadDirective } from '../drag-drop-file-upload.directive';
import * as XLSX from 'xlsx';

@Component({
  selector: 'alpha-drag-drop',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, NgClass, DragDropFileUploadDirective, FormsModule],
  templateUrl: './drag-drop.component.html',
  styleUrl: './drag-drop.component.scss',
})
export class DragDropComponent implements OnInit {

	@ViewChild('fileField', { static: false }) fileField!: ElementRef;

	tableData: any[] = [];
	inputData: string = '';
	lastActiveInput = '';
	fileName = '';

	allowedFileTypes = [
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		'application/vnd.ms-excel',
		'text/csv',
		'application/vnd.oasis.opendocument.spreadsheet',
	];

	constructor() {}

	ngOnInit() {}

	convertToJSON(event: Event) {
		const inputElement = event.target as HTMLTextAreaElement;
		const filteredValue = inputElement.value.replace(/[^0-9\s,]/g, '');
		if (inputElement.value !== filteredValue) {
		  this.inputData = filteredValue; 
		}
		this.fileField.nativeElement.value = '';
		this.lastActiveInput = 'testArea';
		this.fileName = '';
		const rowValues = this.inputData.split('\n');
		if (rowValues.length > 0) {
			const values = rowValues.filter(x => x !== '');
			const inputOutput = values.map((row: String) => {
				const cond1: string[] = row.split(' ');
				const cond2: string[] = row.split(',');
				const cond3: string[] = row.split('\t');
				const cond4: string[] = row.split('	');
				let columns = cond1.length > 1 ? cond1 : cond2.length > 1 ? cond2 : cond3.length > 1 ? cond3 : cond4.length > 1 ? cond4 : cond1.length === 1 ? cond1 : cond2.length === 1 ? cond2 : cond3.length === 1 ? cond3 : cond4 ;
				columns = columns.filter(x => x !== '');
				return {
					ECN: columns[0] ? columns[0].replace(',', '').trim() : '',
					Company: columns[1] ? columns[1].replace(',', '').trim() : '999'
				};
			});
			if(inputOutput.length > 0) {
				this.tableData = inputOutput;
			} else {
				this.tableData = [];
			}
		} else {
			this.tableData = [];
		}
	}

	restrictTextareaInput(event: KeyboardEvent): void {
		const allowedKeys = [
		  'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', ' ', ',', 'Enter'
		];
		const isNumber = event.key >= '0' && event.key <= '9';
		const isCtrlOrCmd = event.ctrlKey || event.metaKey;
		const allowsShortCut = (event.key.toLowerCase() === 'v' || event.key.toLowerCase() === 'a' || event.key.toLowerCase() === 'z') && isCtrlOrCmd;
		if (!isNumber && !allowedKeys.includes(event.key) && !allowsShortCut) {
		  event.preventDefault();
		}
	}

	handlePaste(event: ClipboardEvent): void {
		const clipboardData = event.clipboardData;
		const pastedText = clipboardData?.getData('textarea') || '';
		const allowedPattern = /^[0-9\s,]*$/;
		if (!allowedPattern.test(pastedText)) {
			event.preventDefault();
		}
	}

  upload(files: FileList) {
	this.inputData = '';
	this.lastActiveInput = 'fileInput';
    const file = files[0];
    if (file) {
      if (!this.allowedFileTypes.includes(file.type)) {
        alert('Invalid file type. Please upload an Excel file.');
        return;
      }
		this.fileName = file.name;
      const reader = new FileReader();
      reader.onload = (e: any) => {
			const data = new Uint8Array(e.target.result);
			const workbook = XLSX.read(data, { type: 'array' });
			const sheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[sheetName];
			const excelData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
			if (excelData.length > 0) {
				const headers = excelData[0];
				const excelObject = excelData.slice(1).map((row: any) => {
					let obj: any = {};
					row.forEach((cell: any, index: number) => {
						if (index < 2) {
							obj[headers[index]] = cell;
						}
					});
					return obj;
				});
				if (excelObject.length > 0) {
					this.tableData = excelObject
				}
			}
      };
      reader.readAsArrayBuffer(file);
    }
  }

  getTableKeys(): string[] {
	return Object.keys(this.tableData[0]);
  }

}
