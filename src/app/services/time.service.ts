import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  sec_limit : number
  constructor() { 
    this.sec_limit = 60
  }

public setSecLimit(new_limit: number){
  this.sec_limit = new_limit
}

public getSecLimit(){
  return this.sec_limit
}

// Returns True if the time is less than 'seconds'
public checkValidTimestamp(timestamp : string){
  let diff_in_seconds = (Date.parse(Date()) - Date.parse(timestamp))/1000
  return diff_in_seconds < this.sec_limit
}

}
