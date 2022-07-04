import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DirectoryServiceService {
  apiBaseUrl = environment.apiBaseUrl + '/api/v1';
  constructor(private httpClient: HttpClient) { }

  createDirectory(directoryName: string, parent: any) {
    return this.httpClient.post(this.apiBaseUrl+'/storage', {
      name: directoryName,
      parent: parent || null
    })
  }
  getDirectoryContent(directoryId: any) {
    let url = this.apiBaseUrl + '/storage/content'
    if (directoryId) { 
      url+= '?directory=' + directoryId; 
    } 
    return this.httpClient.get(url)
  }

  deleteItem(itemId: any){
    let url = this.apiBaseUrl+'/storage/'+itemId+'/delete';
    return this.httpClient.get(url);
  }

  loadTrash(){
    let url = this.apiBaseUrl+'/trash';
    return this.httpClient.get(url)
  }

  recoverItem(itemId:any){
    const url = this.apiBaseUrl+'/storage/'+itemId+'/recover'
    return this.httpClient.get(url);
  }

  //Delete item from trash
  wipeItem(itemId:any){
    const url = this.apiBaseUrl+'/storage/'+itemId+'/wipe'
    return this.httpClient.get(url);
  }
}
