import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MonitorsService } from 'src/app/services/monitors.service';
import { VideoDialogComponent } from 'src/app/layout/dashboard/components/video-dialog/video-dialog.component';
import { TimeService } from 'src/app/services/time.service';


@Component({
  selector: 'app-monitor-dialog',
  templateUrl: './monitor-dialog.component.html',
  styleUrls: ['./monitor-dialog.component.css']
})
export class MonitorDialogComponent implements OnInit {
  // @Input() name: any
  patient : any
  constructor(@Inject(MAT_DIALOG_DATA) private data,public dialog: MatDialog, public monService: MonitorsService, private timeService: TimeService) {
    this.patient = data.patient
    console.log(this.patient)
   }

  ngOnInit(): void {
  }



  public PopupDeviceImage(deviceId : string){

    if (deviceId && deviceId.length>2){
      let dialogRef = this.dialog.open(VideoDialogComponent, {
        height: '850px',
        width: '850px',
        data :{'deviceId': deviceId,
                "remoteUrl": this.monService.getIp()+this.monService.server_prefix+"/monitor_image/"+deviceId,
                "type" : "MonitorImage"},
        position: { left: '0px' }

      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        
      });
    }

  }

  
  public getColorFromBool(bool)
  {
    if (bool){
      return "white"
    }
    return  "#F61818"// "rgb(228, 94, 94)"
  }

}
