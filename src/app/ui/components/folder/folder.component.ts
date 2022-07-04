import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
  @Input() item: any;
  constructor() { }

  ngOnInit(): void {
  }

}
