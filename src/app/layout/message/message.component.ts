import { Component, OnInit, Inject } from '@angular/core';
import {MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  message : string
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { 
    this.message = data
  }
  
  ngOnInit(): void {
  }

}
