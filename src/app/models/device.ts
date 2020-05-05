export class Device {

private timestamp
constructor(protected device_name : string, protected device_id : string){
    if (this.constructor == Device) {
        throw new Error("Abstract classes can't be instantiated.");
      }
}

  public getColorFromBoolean(bool){
    if (bool){
      return "white"
    }
    return "#F61818"
    // return "rgb(228, 94, 94)"
  }

  public setTimestamp(timestamp){
    this.timestamp = timestamp
  }

  public getTimestamp(){
    return this.timestamp
  }

  public getDeviceId(){
    return this.device_id
  }

  public check_total_thresholds()
  {
    return true
  }

  public check_thresholds(value: string, min :number, max : number, return_color = false)
  {
    let num = parseInt(value,10)
    // console.log("min "+min +" max "+max+" num "+ num)
    if(min && max)
    {
      if (num < min || num > max)
        {
            return false
        }
          return true
    }
    
    else if (min){
      if (num < min)
      {
          return false
      }
        return true
    }
    
    else if (max)
    {
      if(num > max)
      {
          return false
      }
        return true
    }
    return true
  }

}

export class Monitor extends Device {

    public segments; heart_rate; spo2; rr; ibp_systole; ibp_diastole; nibp_systole; nibp_diastole; temp; etco2;
    public thresholds = { "temp":{"min":35, "max":38},
                          "etco2":{"min":22, "max":44},
                          "spo2": {"min":90, "max":undefined},
                          "nibp" :{"left":{"min":80, "max":180} , "right":{"min":40, "max":100}},
                          "ibp" :{"left":{"min":80, "max":180} , "right":{"min":40, "max":100}},
                          "rr" : {"min":8, "max":26},
                          "heart_rate" : {"min":45, "max":120}}

    constructor(private patientId: string,protected device_name: string, protected device_id: string){
        super(device_name,device_id)
        this.heart_rate = this.spo2=this.rr= this.ibp_diastole = this.ibp_systole = this.nibp_systole = this.nibp_diastole = this.temp = this.etco2 = 0
    }
    

    public check_total_thresholds()
    {
      return (this.check_thresholds(this.heart_rate,this.thresholds["heart_rate"]["min"], this.thresholds["heart_rate"]["max"]) && 
      this.check_thresholds(this.spo2,this.thresholds["spo2"]["min"], this.thresholds["spo2"]["max"]) &&
      this.check_thresholds(this.rr,this.thresholds["rr"]["min"], this.thresholds["rr"]["max"]) &&
      this.check_thresholds(this.ibp_systole,this.thresholds["ibp"]["left"]["min"], this.thresholds["ibp"]["left"]["max"]) &&
      this.check_thresholds(this.ibp_diastole,this.thresholds["ibp"]["right"]["min"], this.thresholds["ibp"]["right"]["max"]) &&
      this.check_thresholds(this.nibp_systole,this.thresholds["nibp"]["left"]["min"], this.thresholds["nibp"]["left"]["max"]) &&
      this.check_thresholds(this.nibp_diastole,this.thresholds["nibp"]["right"]["min"], this.thresholds["nibp"]["right"]["max"]) &&
      this.check_thresholds(this.temp,this.thresholds["temp"]["min"], this.thresholds["temp"]["max"]) &&
      this.check_thresholds(this.etco2,this.thresholds["etco2"]["min"], this.thresholds["etco2"]["max"]))
    }




    public getPatientId(){
        return this.patientId
    }

    public setValuesBySegments(segments : Array<any>){
        this.segments = segments
        segments.forEach(
          
            data => {
              if (data["name"] == "HR"){
                if(data["value"] == null)
                  this.heart_rate = undefined
                else if (data["value"].length > 0)
                  this.heart_rate = data["value"]
                else
                 this.heart_rate = "0"
              }

              else if (data["name"] == "SpO2")
              {
                if(data["value"] == null)
                  this.spo2 = undefined
                else if (data["value"].length > 0)
                  this.spo2 = data["value"]
                else
                  this.spo2 = "0"
                
              }

              else if (data["name"] == "RR")
              {
                if(data["value"] == null)
                  this.rr = undefined
                else if (data["value"].length > 0)
                  this.rr = data["value"]
                else
                  this.rr = "0"
              }
              
              else if (data["name"] == "IBP")
              {
                if(data["value"] == null){
                  this.ibp_systole = undefined
                  this.ibp_diastole = undefined
                }
                else if (data["value"].length > 0)
                {
                  let splited = data["value"].split("/")
                  this.ibp_systole = splited[0]
                  this.ibp_diastole = splited[1]
                }
                else
                {
                  this.ibp_systole = "0"
                  this.ibp_diastole = "0"
                }
              }

              else if (data["name"] == "IBP-Systole")
                {
                  if(data["value"] == null)
                    this.ibp_systole = undefined
                  else if (data["value"].length > 0)
                    this.ibp_systole = data["value"]
                  else
                    this.ibp_systole = "0"
                }
              // Right value
              else if (data["name"] == "IBP-Diastole")
                {
                  if(data["value"] == null)
                    this.ibp_diastole = undefined
                  else if (data["value"].length > 0)
                    this.ibp_diastole = data["value"]
                  else
                    this.ibp_diastole = "0"
                }

                else if (data["name"] == "NIBP")
                {
                  if(data["value"] == null){
                    this.nibp_systole = undefined
                    this.nibp_diastole = undefined
                  }
                  else if (data["value"].length > 0)
                  {
                    let splited = data["value"].split("/")
                    this.nibp_systole = splited[0]
                    this.nibp_diastole = splited[1]
                  }
                  else
                  {
                    this.nibp_systole = "0"
                    this.nibp_diastole = "0"
                  }
                }
                
              // Left value
              else if (data["name"] == "NIBP-Systole")          
              {
                if(data["value"] == null)
                  this.nibp_systole = undefined
                else if (data["value"].length > 0)
                  this.nibp_systole = data["value"]
                else
                  this.nibp_systole = "0"
              }
              // Right value
              else if (data["name"] == "NIBP-Diastole")
                {
                  if(data["value"] == null)
                    this.nibp_diastole = undefined
                  else if (data["value"].length > 0)
                    this.nibp_diastole = data["value"]
                  else
                    this.nibp_diastole = "0"
                }
              
              else if (data["name"] == "Temp")
              {
                if(data["value"] == null)
                  this.temp = undefined
                else if (data["value"].length > 0)
                  this.temp = data["value"]
                else
                  this.temp = "0"
              }
              else if (data["name"] == "etCO2")
                {
                  if(data["value"] == null)
                    this.etco2 = undefined
                  else if (data["value"].length > 0)
                    this.etco2 = data["value"]
                  else
                    this.etco2 = "0"
                }
          })
    }
        
}


export class Respirator extends Device {

  public segments;
  public breathing_method
  public tidal_volume 
  public expiratory_tidal_volume
  public rate
  public total_rate
  public peep
  public peak_pressure
  public fio2
  public arterial_line
  public ie_ratio
  public inspiratory_time

  public thresholds = { 
  "breathing_method":{"min":undefined, "max":undefined},
  "tidal_volume":{"min":350, "max":600},
  "expiratory_tidal_volume": {"min":undefined, "max":undefined},
  "rate":{"min":10, "max":40},
  "total_rate":{"min":10, "max":40},
  "peep" : {"min":undefined, "max":undefined},
  "fio2" : {"min":undefined, "max":undefined},
  "ie_ratio" : {"min":undefined, "max":undefined},
  "inspiratory_time" : {"min":undefined, "max":undefined},
  "peak_pressure" : {"min":undefined, "max":40}}


    constructor(private patientId :string, protected device_name: string, protected device_id: string){
        super(device_name,device_id)
    }

  public setValuesBySegments(segments : Array<any>){
      this.segments = segments
      segments.forEach(
          data => {
            if (data["name"] == "Tidal Volume"){
              this.tidal_volume = data["value"]
            }

            else if (data["name"] == "Expiratory Tidal Volume"){
              this.expiratory_tidal_volume = data["value"]
            }

            else if (data["name"] == "Rate"){
              this.rate = data["value"]
            }
            
            else if (data["name"] == "Total Rate"){
              this.total_rate = data["value"]
            }

            else if (data["name"] == "Peep"){
              this.peep = data["value"]
            }
            else if (data["name"] == "Ppeek"){
              this.peak_pressure = data["value"]
            }
            else if (data["name"] == "FIO2"){
              this.fio2 = data["value"]
            }
            else if (data["name"] == "Arterial Line"){
              this.arterial_line = data["value"]
            }
            else if (data["name"] == "I:E Ratio"){
              this.ie_ratio = data["value"]
            }
            else if (data["name"] == "Inspiratory Time"){
              this.inspiratory_time = data["value"]
            }
        })
  }

  public getPatientId(){
    return this.patientId
  }
  

  public check_total_thresholds()
  {
    return (this.check_thresholds(this.tidal_volume,this.thresholds["tidal_volume"]["min"], this.thresholds["tidal_volume"]["max"]) && 
    this.check_thresholds(this.expiratory_tidal_volume,this.thresholds["expiratory_tidal_volume"]["min"], this.thresholds["expiratory_tidal_volume"]["max"]) &&
    this.check_thresholds(this.rate,this.thresholds["rate"]["min"], this.thresholds["rate"]["max"]) &&
    this.check_thresholds(this.total_rate,this.thresholds["total_rate"]["min"], this.thresholds["total_rate"]["max"]) &&
    this.check_thresholds(this.peep,this.thresholds["peep"]["min"], this.thresholds["peep"]["max"]) && 
    this.check_thresholds(this.peak_pressure,this.thresholds["peak_pressure"]["min"], this.thresholds["peak_pressure"]["max"]) &&
    this.check_thresholds(this.peak_pressure,this.thresholds["fio2"]["min"], this.thresholds["fio2"]["max"]) &&
    this.check_thresholds(this.ie_ratio,this.thresholds["ie_ratio"]["min"], this.thresholds["ie_ratio"]["max"]) &&
    this.check_thresholds(this.inspiratory_time,this.thresholds["inspiratory_time"]["min"], this.thresholds["inspiratory_time"]["max"]))

  }

}


export class Ivac extends Device {

  public segments 
  public medication: number
  public volume_left_to_infuse : number
  public volume_to_insert: number
  public infusion_rate: number

  public thresholds = { "volume_left_to_infuse":{"min":10, "max":undefined},
  "volume_to_insert":{"min":10, "max":undefined},
  "infusion_rate": {"min":0, "max":undefined}}


    constructor(private patientId :string, protected device_name: string, protected device_id: string){
        super(device_name,device_id)
    }

    public setValuesBySegments(segments : Array<any>){
      this.segments = segments
      segments.forEach(
          data => {
            if (data["name"] == "Medication Name"){
              this.medication = data["value"]
            }

            else if (data["name"] == "Volume Left to Infuse"){
              this.volume_left_to_infuse = data["value"]
            }

            else if (data["name"] == "Volume to Insert"){
              this.volume_to_insert = data["value"]
            }
            
            else if (data["name"] == "Infusion Rate"){
              this.infusion_rate = data["value"]
            }
        })
  }  
}
