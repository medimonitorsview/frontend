import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MonitorDialogComponent } from '../monitor-dialog/monitor-dialog.component';
import { Monitor, Respirator, Ivac } from 'src/app/models/device';
import { MonitorsService } from 'src/app/services/monitors.service';
import { Patient } from 'src/app/models/patient';



interface monitor_data {
  segments: [];
  timestamp: Date;
}

@Component({
  selector: 'app-monitors-grid',
  templateUrl: './monitors-grid.component.html',
  styleUrls: ['./monitors-grid.component.css']
})
@Inject(MonitorsService)
export class MonitorsGridComponent implements OnInit, OnDestroy {
  
  // monitorIds : Array<string>
  monitorIds : string[]
  isLoading = false
  patients_array = []
  refused_connection = false
  interval : any
  // public monitors$: Observable<Monitor[]>
  public monitors: Monitor[];
  devices_list : any
  loaded = false
  constructor(public dialog: MatDialog, public monService : MonitorsService) { 
    this.monService.startInterval()
  }


  public getPatientFromList(patientId, patients_array : Patient[]){
    for (let i = 0 ; i < patients_array.length ; i++)
    {
      if (patientId  == patients_array[i].getPatientId()){
        return patients_array[i]
      }
    }
    return undefined
  }

  
  public openDialog(event)
  {
    
    let id = event.target.id
    if (!event.target.id){
    // Detecting mat-grid-tile id (and not children objects)
    let obj = event.target
    let name = obj.className
    let i = 0
    // while (name != "mat-grid-tile")
    while (name != "mat-card")
    {
      obj = obj.offsetParent
      name = obj.className.split(" ")[0]
      console.log("id "+obj.id)
      if (i > 10){
        return
      }
      i++
    }
     id = obj.id
  }

    if (!id){return}

let cur_patient 
this.monService.patients_array.forEach((patient:Patient)=>{
  if (id == patient.getPatientId()){
    cur_patient = patient
  }
})
if (cur_patient){
    let dialogRef = this.dialog.open(MonitorDialogComponent, {
      height: '600px',
      width: '475px',
      data :{patient:cur_patient}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }}


  ngOnInit(): void {
  
  }

checkForDeletedDevices()
{
  this.monService.patients_array.forEach(
    (patient: Patient) => {

      let cur_mon = patient.getMonitor()
      let found = false
      if (cur_mon)
      {
        for(var i = 0 ; i < this.devices_list.length ; i++)
        {
          if (cur_mon.getDeviceId() == this.devices_list[i]){
            found = true
            break
          }
        }
        if (!found){
          patient.setMonitor(undefined)
        }
      } 
      
      let cur_resp = patient.getRespirator()
      if(cur_resp)
      {
        found = false
        for(var i = 0 ; i < this.devices_list.length ; i++)
        {
          if (cur_resp.getDeviceId() == this.devices_list[i]){
            found = true
            break
          }
        }
        if (!found){
          patient.setRespirator(undefined)
        }
      }

      let cur_ivac = patient.getIvac()
      if(cur_ivac)
      {
        found = false
        for(var i = 0 ; i < this.devices_list.length ; i++)
        {
          if (cur_ivac.getDeviceId() == this.devices_list[i]){
            found = true
            break
          }
        }
        if (!found){
          patient.setIvac(undefined)
        }
      }

    }
  )
}

ngOnDestroy(){
  this.monService.stopInterval()
}
}
