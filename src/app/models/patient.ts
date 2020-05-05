import { Monitor, Respirator, Ivac } from './device';

export class Location{
    constructor(private floor: number, private room: number, private bed_id: number){
    }
}

export class Patient {
    
    private monitor: Monitor
    private respirator : Respirator
    private ivac: Ivac
    private room : number
    
    constructor(private patient_id: string ){
    }


    public checkTotalThresholds()
    {
        let result = true
        if (this.getMonitor())
        {
            result = result && this.getMonitor().check_total_thresholds()
        }
        if (this.hasRespirator())
        {
            result = result && this.getRespirator().check_total_thresholds()
        }
        if (this.hasIvac())
        {
            result = result && this.getIvac().check_total_thresholds()
        }
        return result
    }

    public getPatientId(){
        return this.patient_id
    }

    public setRoom(room){
        this.room = room
    }

    public getRoom(){
        return this.room
    }

    public setMonitor(monitor: Monitor){
        this.monitor = monitor
    }

    public getMonitor(){
        return this.monitor
    }

    public setRespirator(respirator: Respirator){
        this.respirator = respirator
    }

    public getRespirator(){
        return this.respirator
    }

    public setIvac(ivac: Ivac){
        this.ivac = ivac
    }

    public getIvac(){
        return this.ivac
    }

    public hasMonitor(){
        if (this.monitor){
            return true
        }
        return false
    }

    public hasRespirator(){
        if (this.respirator){
            return true
        }
        return false
    }

    public hasIvac(){
        if (this.ivac){
            return true
        }
        return false
    }
}
