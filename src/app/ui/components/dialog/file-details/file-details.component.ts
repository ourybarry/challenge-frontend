import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.css']
})
export class FileDetailsComponent implements OnInit {

  item: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {item: any}) { }

  ngOnInit(): void {
    this.item = this.data.item
  }

}
