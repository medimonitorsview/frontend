export class Monitor {

    public patientId: number
    public monitorId: string
    public imageId: string
    public bedId: number
    public roomId: number
    public deviceCategory: string
    public deviceModel: string
    public hr: number
    public ibp: string
    public nibp: string
    public temp: number
    public etCO2: number
    public spO2: number
    public rr: number
    public segments

    constructor(patientId: number, monitorId: string,imageId : string,
       bedId: number,roomId: number,deviceCategory: string, deviceModel: string, hr:number, ibp:string, nibp:string, temp:number,
        etCO2: number, spO2: number, rr: number) {
      this.patientId = patientId
      this.monitorId = monitorId
      this.imageId = imageId
      this.roomId = roomId
      this.deviceCategory = deviceCategory
      this.deviceModel = deviceModel
      this.hr = hr
      this.bedId = bedId
      this.ibp = ibp
      this.nibp = nibp
      this.temp = temp
      this.etCO2 = etCO2
      this.spO2 = spO2
      this.rr = rr
    }

    public setSegments(segments){
      this.segments = segments
    }
}
