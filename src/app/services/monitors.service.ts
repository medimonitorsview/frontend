import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Observer, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Patient } from '../models/patient';
import { DomSanitizer } from '@angular/platform-browser';
import { Respirator, Monitor, Ivac } from '../models/device';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class MonitorsService{
  
  private remote_server : string;
  public patients_array : Array<Patient>
  public server_prefix
  public interval
  constructor(private http: HttpClient, private sanitizer : DomSanitizer) { 
    this.server_prefix = "/api"
    this.patients_array = []
    this.remote_server = localStorage.getItem('ip')
    if(!this.remote_server){
      this.setIp("")
    }
    console.log("loaded ip "+ this.remote_server)
 
  }

  public startInterval(){
    this.interval = setInterval(
      () => this.fetchData(),1000)
  }

  public stopInterval(){
    clearInterval(this.interval)
  }
  
  private async fetchData(){
  try{
    const monitorsList = await this.getMonitors()
    if(!monitorsList)
        return
    
    this.checkIfPatientExists(monitorsList)
    this.checkForDeletedDevices(monitorsList)

    monitorsList.map(
      async cur_monitor_id =>
      {
        const cur_monitor = await this.getMonitor(cur_monitor_id)
        if ( !cur_monitor || !cur_monitor.patientId){
          return
        }
        let cur_patientId = cur_monitor.patientId
        if (!cur_patientId || cur_patientId.length < 1){
          return
        }
        let patient = this.getPatientFromList(cur_monitor.patientId, this.patients_array)
        if (!patient){
          patient = new Patient(cur_patientId)
          this.patients_array.push(patient)
        }
        
        const mon_data = await this.getMonitorData(cur_monitor_id)
        if(!mon_data){
          this.patients_array.splice(0,1) // Removing the patient just added
          return
        }

        let timestamp = mon_data.timestamp
        let monitor_segments_data = mon_data.segments
        if (cur_monitor.deviceCategory == "monitor")
        {
          if (patient.hasMonitor()){
            patient.getMonitor().setValuesBySegments(monitor_segments_data)
            patient.getMonitor().setTimestamp(timestamp)
            patient.setRoom(cur_monitor.roomId)
          }
          else{
            let monitor = new Monitor(cur_patientId, cur_monitor.deviceModel, cur_monitor_id)
            monitor.setValuesBySegments(monitor_segments_data)
            monitor.setTimestamp(timestamp)
            patient.setMonitor(monitor)
            patient.setRoom(cur_monitor.roomId)

          }
        }

        else if (cur_monitor.deviceCategory == "respirator"){
        
          if (patient.hasRespirator()){
            patient.getRespirator().setValuesBySegments(monitor_segments_data)
            patient.getRespirator().setTimestamp(timestamp)
            patient.setRoom(cur_monitor.roomId)

          }
          else{
            let respirator = new Respirator(cur_patientId, cur_monitor.deviceModel, cur_monitor.monitorId)
            respirator.setValuesBySegments(monitor_segments_data)
            respirator.setTimestamp(timestamp)
            patient.setRespirator(respirator)
            patient.setRoom(cur_monitor.roomId)
          }
        }

        else if (cur_monitor.deviceCategory == "ivac"){
          
          if (patient.hasIvac()){
            patient.getIvac().setValuesBySegments(monitor_segments_data)
            patient.getIvac().setTimestamp(timestamp)
            patient.setRoom(cur_monitor.roomId)
          }
          else{
            let ivac = new Ivac(cur_patientId, cur_monitor.deviceModel, cur_monitor.monitorId)
            ivac.setValuesBySegments(monitor_segments_data)
            ivac.setTimestamp(timestamp)
            patient.setIvac(ivac)
            patient.setRoom(cur_monitor.roomId)
          }
        }
        if(!patient.hasMonitor() && !patient.hasRespirator() && !patient.hasIvac()){
          console.log("popped"+ patient)
          this.patients_array.pop()
        }

      },
      error => {console.log("Error while running on monitors list :"+error)}
    )
  }
  catch (error){
    console.log("Error while loading patients: "+ error.message)
  }
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

private checkIfPatientExists(monitorsList)
{
  for(let i = 0 ; i < this.patients_array.length ; i++){
    let patient_exists = false
    for(let j = 0 ; j < monitorsList.length ; j++)
    {
      if (this.patients_array[i].getMonitor() && this.patients_array[i].getMonitor().getDeviceId() == monitorsList[j])
      {
        patient_exists = true
        break
      }
      else if (this.patients_array[i].getRespirator() && this.patients_array[i].getRespirator().getDeviceId() == monitorsList[j])
      {
        patient_exists = true
        break
      }
      else if (this.patients_array[i].getIvac() && this.patients_array[i].getIvac().getDeviceId() == monitorsList[j])
      {
        patient_exists = true
        break
      }
    }
    if (!patient_exists){
      console.log("Removing " + this.patients_array[i].getPatientId())
      this.patients_array.splice(i,1)
    }
  }
}

checkForDeletedDevices(monitorsList)
{
  this.patients_array.forEach(
    (patient: Patient) => {

      let cur_mon = patient.getMonitor()
      let found = false
      if (cur_mon)
      {
        for(var i = 0 ; i < monitorsList.length ; i++)
        {
          if (cur_mon.getDeviceId() == monitorsList[i]){
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
        for(var i = 0 ; i < monitorsList.length ; i++)
        {
          if (cur_resp.getDeviceId() == monitorsList[i]){
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
        for(var i = 0 ; i < monitorsList.length ; i++)
        {
          if (cur_ivac.getDeviceId() == monitorsList[i]){
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


// ===================================================================================================================

  public setIp(ip){
    
      if (ip.endsWith("/")){
        ip = ip.substring(0,ip.length -1)
      }
      if (ip != "" && !ip.startsWith('http')){
        ip=`http://${ip}`;
      }
      
      this.remote_server = ip
      localStorage.setItem('ip', this.remote_server);

      if(ip == "" || ip == "localhost")
        console.log("IP is pointing to this machine")
      else
        console.log("New ip "+this.remote_server)
    
  }
// ===================================================================================================================

  public getIp(){
    return this.remote_server
  }

  // ===================================================================================================================

  getMonitor(monitorId: string) : Promise<any>{    
    let monitor_url = this.remote_server+this.server_prefix+"/monitor/"
      return this.http.get<Monitor>(monitor_url+monitorId).toPromise()
      .then((res: any) => {
        if(!res || !res.patientId)
        {
          throw new Error("patientId is not defined")
        }
        return res
          
      })
      .catch(
        err => {
          console.log("Error while getting monitor ("+monitorId+"). "+ err.message)
          return
        }
      )
  }

  // ===================================================================================================================
  async getMonitorsList() : Promise<any>
  {
    let monitorIds_url = this.remote_server+this.server_prefix+"/monitor/list"
    return await this.http.get<string[]>(monitorIds_url).toPromise()
  }

  // ===================================================================================================================

   getMonitorData(monitorId: string) : Promise<any>{
    let monitor_data = this.remote_server+this.server_prefix+"/monitor_data/"
      return this.http.get(monitor_data+monitorId).toPromise()
      .then( res => {
        if(!res)
          throw new Error("Response is null")
        return res
        
      })
      .catch( err => {
        console.log("Error while getting monitor ("+monitorId+") data.")
      })
  }

  // ===================================================================================================================

  getMonitors(): Promise<any> {
    let monitorIds_url = this.remote_server+this.server_prefix+"/monitor/list"
    return this.http.get<string[]>(monitorIds_url).toPromise()
  }

   // ===================================================================================================================

  public deleteMonitor(deviceId: string){
    this.http.delete(this.remote_server+this.server_prefix+"/monitor/"+deviceId).subscribe(
      success => console.log(deviceId +" deleted successfully from the server."),
      err => console.log("Error "+ deviceId +" did not deleted successfully from the server. "+ err)
    )

  }

  updateMonitor(deviceId, data){
    this.http.post(this.remote_server+this.server_prefix+"/monitor/"+deviceId, data).subscribe(
      success => console.log(deviceId +" updated successfully on the server."),
      err => console.log("Error "+ deviceId +" did not update successfully on the server. "+ err)
    )
  }

  deletePatient(patient: Patient)
  {
    if (patient.hasMonitor())
    this.deleteMonitor(patient.getMonitor().getDeviceId())

  if (patient.hasRespirator())
    this.deleteMonitor(patient.getRespirator().getDeviceId())

  if (patient.hasIvac())
    this.deleteMonitor(patient.getIvac().getDeviceId())
  }

  updatePatient(patient: Patient, data)
  {
    if (patient.hasMonitor())
    this.updateMonitor(patient.getMonitor().getDeviceId(), data)

  if (patient.hasRespirator())
    this.updateMonitor(patient.getRespirator().getDeviceId(),data)

  if (patient.hasIvac())
    this.updateMonitor(patient.getIvac().getDeviceId(),data)
  }


  public uploadApplication(name, version, formData) {
    const upload_url = this.remote_server+this.server_prefix+"/app/"+name+"/"+version
    return this.http.post<any>(upload_url, formData, {  
        reportProgress: true,  
        observe: 'events'  
      });  
  }

  public getApplication(name) {
    const getVersionsUrl = this.remote_server+this.server_prefix+"/app/versions/"+name
    return this.http.get<any>(getVersionsUrl);  
  }

  public getVersionURL(name, version){
    const url = this.remote_server+this.server_prefix+"/app/"+name+"/"+version
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  public removeVersion(name, version){
    const removeVersionUrl = this.remote_server+this.server_prefix+"/app/"+name+"/"+version
    return this.http.delete<any>(removeVersionUrl).toPromise()
  }
}

  
