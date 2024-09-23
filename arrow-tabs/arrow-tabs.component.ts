import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataTableComponent } from '../dataTable/dataTable.component';

@Component({
  selector: 'alpha-arrow-tabs',
  standalone: true,
  imports: [
    CommonModule, DataTableComponent
  ],
  templateUrl: './arrow-tabs.component.html',
  styleUrl: './arrow-tabs.component.css',
})
export class ArrowTabsComponent {
	tabs = ['Initiation', 'Data Source', 'Overrides', 'Publish', 'Validation'];
	activeTab = 2;
	activeTabContent: string | null = 'Content Overrides';
 
	selectTab(index: number) {
	  this.activeTab = index;
	  this.activeTabContent = `Content of ${this.tabs[index]}`;
	}
}
