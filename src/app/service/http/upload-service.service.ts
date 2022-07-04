import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, empty, expand, map, reduce } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
/**
 * This service is used to initialize and perform multipart upload operations
 */
export class UploadService {

  API_BASE_URL  = environment.apiBaseUrl+'/api/v1';
  CHUNK_SIZE : number = 1024*1024*8

  constructor(private httpClient: HttpClient) { }

  /**
   * This method initialize our multipart upload, basically it tells
   * our backend to save our new item in database and prepare to receive item's data
   * Once the backend is notified about the new upload, it create a new StorageItem object and 
   * returns us it's fileId, the fileId will be used to upload chunks of our file
   */
  initializeMultipartUpload(file: File, parentDirectory: any = null,replace: boolean = false){
    const requestBody = {
      'fileName': file.name,
      'mimeType': file.type,
      'fileSize': file.size,
      'parentDirectory': parentDirectory,
      'replace': replace
    }
    return this.httpClient.post(this.API_BASE_URL+'/multipart_upload/initialize', requestBody)
  }

  /**
   * This one performs a recursive operation that upload chunks one by one until
   * everything is uploaded
   */
  sendMultipartUploadPart(file: File, fileId: string){
    const totalChunks = Math.ceil(file.size / this.CHUNK_SIZE)
    // console.log(totalChunks)
    let chunkNumber = 0;
    return this.uploadChunk(file, chunkNumber, fileId).pipe(
      expand((res)=> chunkNumber+1 < totalChunks ? this.uploadChunk(file, ++chunkNumber, fileId) : EMPTY ),
      map(res => res),
      // reduce((accumulator, value) => accumulator.concat(value), new Array())
    )
  }


  completeMultipartUpload(fileId: string){
    return this.httpClient.get(this.API_BASE_URL+'/multipart_upload/complete_upload/'+fileId);
  }

  uploadChunk(file: File, chunkNumber: number, fileId: string){
    // console.log(`Uploading chunk ${chunkNumber}`)
    const offset = chunkNumber * this.CHUNK_SIZE;
    const body = new FormData()
    body.append('chunkData', file.slice(offset, offset+this.CHUNK_SIZE))

    return this.httpClient.post(this.API_BASE_URL+'/multipart_upload/send_part/'+fileId+'-'+chunkNumber.toString(), body)
  }

  
  downloadFile(fileId: string){
    return this.httpClient.get(this.API_BASE_URL+'/multipart_download/download/'+fileId, { responseType: 'blob' });
  }
  
}
