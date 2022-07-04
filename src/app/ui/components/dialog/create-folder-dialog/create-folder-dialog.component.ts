import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-folder-dialog',
  templateUrl: './create-folder-dialog.component.html',
  styleUrls: ['./create-folder-dialog.component.css']
})
export class CreateFolderDialogComponent implements OnInit {

  fileName = '';

  constructor() { }

  ngOnInit(): void {
  }

}
