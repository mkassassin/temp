import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'alpha-data-table',
  standalone: true,
  imports: [
    CommonModule,
	 ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
	 MatSelectModule
  ],
  templateUrl: './dataTable.component.html',
  styleUrl: './dataTable.component.css'
})
export class DataTableComponent { 
	form: FormGroup;
	displayedColumns: string[] = ['country', 'isoAlpha2', 'isoAlpha3', 'isoNumeric', 'riskScore', 'riskRating', 'riskRank', 'riskRatingOverrides', 'rationale'];
	dataSource: any;
	mockData = [
		{country: 'Test', isoAlpha2: 'Test', isoAlpha3: 'Test', isoNumeric: 'Test', riskScore: 'Test', riskRating: 'Test', riskRank: 'Test', riskRatingOverrides: 'Low', rationale: 'Test'},
		{country: 'Test1', isoAlpha2: 'Test1', isoAlpha3: 'Test1', isoNumeric: 'Test1', riskScore: 'Test1', riskRating: 'Test1', riskRank: 'Test1', riskRatingOverrides: 'Low', rationale: ''},
		{country: 'Test2', isoAlpha2: 'Test2', isoAlpha3: 'Test2', isoNumeric: 'Test2', riskScore: 'Test2', riskRating: 'Test2', riskRank: 'Test2', riskRatingOverrides: 'Medium', rationale: 'Test2'}
	]
	riskRatingOverridesList: string[] = ['Low', 'Medium', 'High'];

 
	constructor() {
	  this.form = new FormGroup({
		 rows: new FormArray([])
	  });
	  this.dataSource = (this.form.get('rows') as FormArray).controls;
	  this.updateDataSource();
	}
 
	get rows(): FormArray {
	  return this.form.get('rows') as FormArray;
	}

	getRowsFormGroup(value: any): FormGroup {
		return new FormGroup({
			country: new FormControl(value.country),
			isoAlpha2: new FormControl(value.isoAlpha2),
			isoAlpha3: new FormControl(value.isoAlpha3),
			isoNumeric: new FormControl(value.isoNumeric),
			riskScore: new FormControl(value.riskScore),
			riskRating: new FormControl(value.riskRating),
			riskRank: new FormControl(value.riskRank),
			riskRatingOverrides: new FormControl(value.riskRatingOverrides),
			rationale: new FormControl(value.rationale)
		  });
	}
 
	updateDataSource() {
		this.mockData.forEach(data => {
			this.rows.push(this.getRowsFormGroup(data));
		});
		this.dataSource = [...this.rows.controls];
	}
 
	Submit() {
		console.log(this.rows.value);
		
	}
}
