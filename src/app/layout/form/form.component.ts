import { Component, OnInit, Input, Inject } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MonitorsService} from '../../services/monitors.service'
import { TimeService } from 'src/app/services/time.service';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from '../message/message.component';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    animations: [routerTransition()]
})

export class FormComponent implements OnInit {

    configSuccess: MatSnackBarConfig = {
        panelClass: ['success'],
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      };

    constructor(private monService: MonitorsService, private timeService: TimeService, private snack : MatSnackBar) {}

    ngOnInit() {}


public setServerIp(ip){
    if(this.validateIP(ip)){
        this.monService.setIp(ip)
        console.log("IP address edited successfully to "+this.monService.getIp())  
        this.snack.openFromComponent(MessageComponent, {
            data: "IP address edited successfully to "+this.monService.getIp(), ...this.configSuccess},);
    }
    else{
        this.snack.openFromComponent(MessageComponent, {
            data: "You have entered an invalid IP address", ...this.configSuccess},);
        console.log("You have entered an invalid IP address!")  
    }
}

public validateIP(ipaddress) {
    if(ipaddress == "")
        return true
    const regexp =  new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ //port
    '(\\?[;&amp;a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i');
    return regexp.test(ipaddress);
  }  

public setTimeLimit(seconds : string){
    let sec = parseInt(seconds)

    if(0 < sec){
       
        this.snack.openFromComponent(MessageComponent, {
            data: "Time limit edited successfully to "+seconds+" seconds.", ...this.configSuccess},);

        console.log("Time limit edited successfully to "+seconds+" seconds.")  
        this.timeService.setSecLimit(sec)
    }
    else{
        this.snack.openFromComponent(MessageComponent, {
            data: "Time limit must be positive.", ...this.configSuccess},);
        console.log("Time limit must be positive.")  
    }
}
}
