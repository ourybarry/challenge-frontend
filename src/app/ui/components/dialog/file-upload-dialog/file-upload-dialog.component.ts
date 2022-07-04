import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.css']
})
export class FileUploadDialogComponent implements OnInit {

  encryptionEnabled: boolean = false;
  selectedFile!: File ;

  constructor() { }

  ngOnInit(): void {
  }
  onFileSelect(e: Event){
    const files = (e.target as HTMLInputElement).files
    this.selectedFile = files!.item(0) as File
  }
}
