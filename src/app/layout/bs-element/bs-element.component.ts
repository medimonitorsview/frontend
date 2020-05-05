import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';  
import { map, catchError } from  'rxjs/operators';
import { MonitorsService } from 'src/app/services/monitors.service';
import { of } from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-bs-element',
    templateUrl: './bs-element.component.html',
    styleUrls: ['./bs-element.component.scss'],
    animations: [routerTransition()]
})
export class BsElementComponent implements OnInit {
    @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];  

    @Input()
    name: any

    @Input()
    version : any

    @Input()
    searchName: any
    @Input()
    searchVersion: any

    versionsArray : Array<any>
    valid : Boolean
    constructor(private monService : MonitorsService) {
      this.valid = false
    }

    ngOnInit() {}

    async uploadFile(file) {  
        const formData = new FormData();  
        formData.append('file', file.data); 
        file.inProgress = true;  
        this.monService.uploadApplication(this.name.toLowerCase(), this.version, formData).pipe(  
          map(event => {  
            switch (event.type) {  
              case HttpEventType.UploadProgress:  
                file.progress = Math.round(event.loaded * 100 / event.total);  
                break;  
              case HttpEventType.Response:  
                return event;  
            } 
          }),  
          catchError((error: HttpErrorResponse) => {  
            file.inProgress = false;  
            return of(`${file.data.name} upload failed.`);  
          })).subscribe((event: any) => {  
            if (typeof (event) === 'object') {  
              console.log(event.body);  
            }
          });  
      }

      private uploadFiles() {  
        this.fileUpload.nativeElement.value = '';  
        this.files.forEach((file)=> { 
          this.uploadFile(file);
        })  
    }

    onClick() {  
        const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {  
        for (let index = 0; index < fileUpload.files.length; index++)  
        {  
         const file = fileUpload.files[index];  
         this.files.push({ data: file, inProgress: false, progress: 0});  
        }  
          this.uploadFiles();  
        };  
        fileUpload.click();  
    }

    onReset() {
      this.name = ""
      this.version = ""
      this.files = []
      this.valid = false
  }
    onChange(){
      
      if((this.name && this.name.length > 0) && (this.version && this.version.length > 0)){
        this.valid = true
      }
      else{
        this.valid = false
      }

    }

    async searchOnChange(){
      
      if((this.searchName && this.searchName.length > 0))
      {
        this.versionsArray = await this.monService.getApplication(this.searchName).toPromise()
        console.log("Return" + this.versionsArray)
        if(this.versionsArray && this.versionsArray.length > 0){
          console.log("Versions:", this.versionsArray)
        }
      }
      else{
        this.versionsArray = []
      }
    }

    getSanitizedUrl(name, version){
      return this.monService.getVersionURL(name, version)
    }

    async removeVersion(name, version){
      debugger
      const ret = await this.monService.removeVersion(name, version)
      if(ret)
      {
        console.log("Should remove cell")
        const removed = this.versionsArray.splice(version,1)
        console.log(this.versionsArray, "Removed", removed)
      }
      
    }
}
