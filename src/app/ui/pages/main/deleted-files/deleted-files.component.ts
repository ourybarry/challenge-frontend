import { Component, OnInit } from '@angular/core';
import { DirectoryServiceService } from 'src/app/service/http/directory-service.service';

@Component({
  selector: 'app-deleted-files',
  templateUrl: './deleted-files.component.html',
  styleUrls: ['./deleted-files.component.css']
})
export class DeletedFilesComponent implements OnInit {
  items : any[] = []
  constructor(private directoryService: DirectoryServiceService) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.directoryService.loadTrash().subscribe({
      next: (res: any)=> this.items = res[0],
      error: (err)=> console.error(err)
    })
  }
  restoreItem(id: any){
    this.directoryService.recoverItem(id).subscribe({
      next: ()=>{
        //We refresh trash content after item restauration 
        this.loadData() 
      },
      error: (err)=>{
        console.error(err)
        //handle error
      }
    })
  }
  wipeItem(id: any){
    this.directoryService.wipeItem(id).subscribe({
      next: ()=>{
        //We refresh trash content after item deletion 
        this.loadData() 
      },
      error: (err)=>{
        console.error(err)
        //handle error
      }
    })
  }
}
