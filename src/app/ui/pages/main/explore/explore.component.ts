import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DirectoryServiceService } from 'src/app/service/http/directory-service.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  items: any[] = [];
  currentDir: any;

  constructor(private route: ActivatedRoute, private directoryService: DirectoryServiceService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params: any)=>{
        this.currentDir = params.subDir
        this.loadDirectoryContent(params.subDir)
      }
    })
  }

  loadDirectoryContent(directoryId: any){
    directoryId = directoryId != undefined ? directoryId : null
    this.directoryService.getDirectoryContent(directoryId).subscribe({
      next: (result : any)=> this.items = result[0],
      error: (err)=> console.log(err)
    })
  }
  
  refreshDirectory(){
    this.loadDirectoryContent(this.currentDir)
  }
}
