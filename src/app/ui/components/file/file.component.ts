import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { DirectoryServiceService } from 'src/app/service/http/directory-service.service';
import { UploadService } from 'src/app/service/http/upload-service.service';
import { environment } from 'src/environments/environment';
import { FileDetailsComponent } from '../dialog/file-details/file-details.component';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  @Input() item!: any;

  @ViewChild('menuTrigger') menuOpen!: ElementRef;
  @ViewChild('downloadButton') downloadFormSubmitButton! : ElementRef;

  @Output('refresh') refreshEvent : EventEmitter<any> = new EventEmitter();

  downloadLink!: string;
 
  constructor(private cookieService: CookieService, private directoryService: DirectoryServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.downloadLink = environment.apiBaseUrl+'/api/v1/multipart_download/download/'+this.item.fileId;
  }


  openCustomContextMenu(e: Event) {
    e.preventDefault();
    this.menuOpen.nativeElement.click()
  }

  downloadFile(fileId: string) {
    //To download a the file, we will be using a using form from our template
    //We set the form target to the file URL and submit it, that way we can also send authentication data like our jwt token
    this.downloadFormSubmitButton.nativeElement.click()
  }

  getUserToken(){
    return this.cookieService.get('jwt')
  }

  deleteFile(){
    console.log('deleting')
    this.directoryService.deleteItem(this.item.id).subscribe({
      next: ()=>{
        //Notify parent component to refresh it's content
        this.refreshEvent.emit()
      },
      error: (error: Error)=>{
        console.error(error)
      }
    })
  }

  openFileDetailsDialog(){
    this.dialog.open(FileDetailsComponent, { data: {item: this.item}, width: '500px'})
  }
}
