import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

interface Field {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-mark-dialog',
  templateUrl: './mark-dialog.component.html',
  styleUrls: ['./mark-dialog.component.css']
})

export class MarkDialogComponent implements OnInit {
  final_value : any
  selected : any
  values: Field[] = [
    {value: 'HR', viewValue: 'Heart-Rate'},
    {value: 'ibp-systole', viewValue: 'IBP-Systole'},
    {value: 'ibp-diastole', viewValue: 'IBP-Diastole'},
    {value: 'nibp-systole', viewValue: 'NIBP-Systole'},
    {value: 'nibp-diastole', viewValue: 'NIBP-Diastole'}
  ];

  
  constructor() { 
    this.selected = this.values[0]
  }

  ngOnInit(): void {
  }

}
