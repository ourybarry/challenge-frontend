import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
/**
 * Helper service for fetching directory parents's tree
 */
export class NavigationStackService {

  apiBaseUrl = environment.apiBaseUrl+'/api/v1'

  constructor(private httpClient: HttpClient) { }

  fetchPath(itemId: any){
    let url = this.apiBaseUrl+'/storage/tree'
    if(itemId) url+='?id='+itemId
    return this.httpClient.get(url)
  }

}
