import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as pako from 'pako';
import { DirectoryServiceService } from 'src/app/service/http/directory-service.service';
import { NavigationStackService } from 'src/app/service/http/navigation-stack.service';
import { UploadService } from 'src/app/service/http/upload-service.service';

import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';
import { CreateFolderDialogComponent } from '../dialog/create-folder-dialog/create-folder-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  file!: File;
  currentDir = null;
  parentDir = null;
  path: any[] = []
  @Output("refreshDirectory") refreshDirectory : EventEmitter<any> = new EventEmitter();
  // replaceExistingFile: boolean = false;


  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private uploadService: UploadService, private directoryService: DirectoryServiceService,public dialog: MatDialog, private route: ActivatedRoute, private navigationStack: NavigationStackService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params: any)=>{
        this.currentDir = params.subDir;
        this.fetchDirPath()
        this.parentDir = params.parent;
      }
    })
  }

  fetchDirPath(){
    this.navigationStack.fetchPath(this.currentDir).subscribe({
      next: (path: any)=>{
        this.path = path[0]
      },
      error: (error)=> {
        console.log(error)
      }
    })
  }

  //When user click on upload file
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  //When user select a file
  onFileInput(e: Event) {
    const data: any = (e.target as HTMLInputElement).files
    this.file = data[0];
    this.initializeUpload();
  }

  //Initialize upload
  initializeUpload(replaceExistingFile: boolean = false){
    this.uploadService.initializeMultipartUpload(this.file, this.currentDir,replaceExistingFile).subscribe({
      next: (storageItem: any)=>{
        //If upload initialization is successful, we send the parts
        this.uploadService.sendMultipartUploadPart(this.file, storageItem.fileId).subscribe({
          //When upload initiated we notify parent component to refresh directory content
          next: (value)=>{
            this.refreshDirectory.emit()
          },
          //When error occurs during chunk upload alert the user
          error: (error)=>{
            console.error(error)
          },
          //when we sent all chunks we terminate upload
          complete: ()=>{
            this.uploadService.completeMultipartUpload(storageItem.fileId).subscribe({
              //When upload is complete we notify parent component to refresh directory content
              complete: ()=>{
                this.refreshDirectory.emit()
              }
            })
          }
        })
      },
      error: (error: HttpErrorResponse)=>{
        //We display a prompt incase of file conflict so the user can choose to erase the existing file or not
        if(error.status == HttpStatusCode.Conflict) {
          if(window.confirm('File already exists in destination, do you want to replace it ?')){
            this.initializeUpload(true)
          }
        }
      }
    })
  }

  

  openDirectoryCreationDialog(){
    this.dialog.open(CreateFolderDialogComponent, { width: '350px'}).afterClosed().subscribe({
      next: (directory) => {
        if(directory){
          this.directoryService.createDirectory(directory.fileName, this.currentDir).subscribe({
            next: (directory)=>{
              //If directory is created we notify parent component to refresh parent dir content
              this.refreshDirectory.emit()
            },
            error: (error)=>{
              console.error(error)
            }
          })
        }
      },
      error: (err) => console.error(err)
    })
  }
  getParent(){
    //Item preceding last element of path is parent
    if(this.path.length > 1){
      return this.path[this.path.length - 2].id;
    }
    return '';
  }
}
