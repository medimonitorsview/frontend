import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Monitor, Respirator, Ivac, Device } from 'src/app/models/device';
import { MonitorsService } from 'src/app/services/monitors.service';
import { Patient } from 'src/app/models/patient';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MessageComponent } from '../message/message.component';
import { MatDialog } from '@angular/material/dialog';
import { CanvasComponent } from '../canvas/canvas.component';
import { VideoDialogComponent } from '../dashboard/components/video-dialog/video-dialog.component';

interface monitor_data {
    segments: [];
    timestamp: Date;
  }

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})
export class TablesComponent implements OnInit , OnDestroy{

  loaded 
    constructor(private monService: MonitorsService, private snack : MatSnackBar,public dialog: MatDialog) {
      this.monService.startInterval()
      this.loaded = false        
    }

    ngOnInit() {}
    ngOnDestroy(){this.monService.stopInterval()}

//   updateList(id: number, property: string, event: any) {
//     const editField = event.target.textContent;
//     this.personList[id][property] = editField;
//   }

  update(patient:Patient){
    debugger
    const patientId_input = (<HTMLInputElement>document.getElementById(patient.getPatientId()+"-patientId"))
    const patientId = patientId_input.value
    const roomId_input = (<HTMLInputElement>document.getElementById(patient.getPatientId()+"-roomId"))
    const roomId = roomId_input.value
    // const label = (<HTMLInputElement>document.getElementById(patient.getPatientId()+"-patientId-label")) 
    // label.setAttribute("value",patientId)
    // patientId_input.value = ""
    
    if (patient){

        const data = {
            "patientId":patientId,
            "roomId":roomId
        }
        this.monService.updatePatient(patient,data)
        let configSuccess: MatSnackBarConfig = {
            panelClass: ['success'],
            duration: 1000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          };
        this.snack.openFromComponent(MessageComponent, {
            data: "Updated Successfully ! :)", ...configSuccess
          },);
        
    }

  }

  remove(patient:Patient, id) {
    this.monService.deletePatient(patient)
    this.monService.patients_array.splice(id, 1);
    let configSuccess: MatSnackBarConfig = {
        panelClass: ['success'],
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      };
    this.snack.openFromComponent(MessageComponent, {
        data: patient.getPatientId()+" removed successfully ! :)", ...configSuccess
      },);
    
  }

  removeMonitor(device:Device, id) {
    this.monService.deleteMonitor(device.getDeviceId())
    
    let configSuccess: MatSnackBarConfig = {
        panelClass: ['success'],
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      };
    this.snack.openFromComponent(MessageComponent, {
        data: device.getDeviceId()+" removed successfully ! :)", ...configSuccess
      },);
  }

  openEditor(device: Device){
      // debugger
    const dialogRef = this.dialog.open(CanvasComponent, {
        width: '65%',
        height: '65%',
        data: {"device":device}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // this.animal = result;
      });
    }
  

public PopupQRCode(deviceId : string){

  if (deviceId && deviceId.length>2){
    let dialogRef = this.dialog.open(VideoDialogComponent, {
      height: '850px',
      width: '850px',
      data :{'deviceId': deviceId,
             'remoteUrl': this.monService.getIp()+"/cv/v1/qr_display/"+deviceId,
             "type" : "QR"},
      position: { left: '0px' }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
}
}


