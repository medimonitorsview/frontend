import { Component, OnInit, Input, Inject, ViewChild, HostListener } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { TimeService } from 'src/app/services/time.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { MonitorsService } from 'src/app/services/monitors.service';
import { Device } from 'src/app/models/device';


export class MonitorItem {

  constructor(){}
}

@Component({
  selector: 'app-monitor-item',
  templateUrl: './monitor-item.component.html',
  styleUrls: ['./monitor-item.component.css']
})
@Inject(TimeService)
export class MonitorItemComponent implements OnInit {

  @Input() patient : Patient;

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;


  constructor(private timeService: TimeService, public monService: MonitorsService) {
   }

  ngOnInit(): void {
  }

  public getColorFromBool(bool)
  {
    if (bool){
      return "white"
    }
    return  "rgb(228, 94, 94)"
  }
  
  contextMenuPosition = { x: '0px', y: '0px' };

  onContextMenu(event: MouseEvent, patient: Patient) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'patient': patient };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  onContextMenuDeleteDevice(device: Device) {
    this.monService.deleteMonitor(device.getDeviceId())
    
  }

  onContextMenuDeletePatient(patient: Patient) {

    if (patient.hasMonitor())
      this.monService.deleteMonitor(patient.getMonitor().getDeviceId())

    if (patient.hasRespirator())
      this.monService.deleteMonitor(patient.getRespirator().getDeviceId())

    if (patient.hasIvac())
      this.monService.deleteMonitor(patient.getIvac().getDeviceId())
      
  }


}
