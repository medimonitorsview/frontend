import { Component, OnInit, Inject, Input, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MonitorsService } from 'src/app/services/monitors.service';
import { HttpClient } from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrls: ['./video-dialog.component.css']
})
export class VideoDialogComponent implements OnInit, OnDestroy {

  deviceId : any
  url : any
  loaded
  @Input()
  checked : Boolean
  interval : any
  type: any
  enable_ocr_checkbox : Boolean
  first_image_loaded: Boolean
  constructor(@Inject(MAT_DIALOG_DATA) private data, public monService: MonitorsService, private http : HttpClient,private sanitizer:DomSanitizer) {
    this.loaded = false
    this.checked = false
    this.deviceId = data.deviceId
    this.type = data.type
    const remoteUrl = data.remoteUrl
    const show_ocr_url = "?show_ocr=true"
    this.enable_ocr_checkbox = false
    this.first_image_loaded = false
    
    if(this.type == "MonitorImage") 
    {
     this.enable_ocr_checkbox = true 
    }
    console.log(remoteUrl)
    
    this.interval = setInterval(
      () =>{
        console.log(this.checked)
        let requestUrl = remoteUrl
        if(this.checked)
        {
          requestUrl += show_ocr_url
        }
    
        this.http.get(requestUrl, { responseType:'arraybuffer' }).subscribe(
          (response :any) => { // download file
              this.loaded = false
              const blob = new Blob([response], {type: 'image/jpg'});
              this.url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
              this.loaded = true
              this.first_image_loaded=true
              },
              err => {this.loaded = false})
 
      },1000)
   }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    clearInterval(this.interval)
  }
}
