import { Component, OnInit, ViewChild, ElementRef, Inject, Input } from '@angular/core';
import { MonitorsService } from 'src/app/services/monitors.service';
import { Device } from 'src/app/models/device';
import { MarkDialogComponent } from './mark-dialog/mark-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export class Rect
{
  public name;
  public x1
  public y1
  public x2
  public y2

  constructor(){
  }

  
  public return_pts() : Array<any>{
    return [this.x1,this.y1,this.x2,this.y2]
  }
}

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  @ViewChild('canvas', { static: true }) 
  canvas: ElementRef<HTMLCanvasElement>;
  
  
  @ViewChild("image", { static: false })
  public imageElement: ElementRef;
  private ctx: CanvasRenderingContext2D;

  rectArray : Array<Rect>
  isFirstPoint : Boolean
  currect_rect : Rect

  offsetX :number
  offsetY: number
  device: Device

  @Input("src")
  url : string
  marked_fields : any
  // private cropper: Cropper;

  constructor(@Inject(MAT_DIALOG_DATA) private data, private monService: MonitorsService, private dialog : MatDialog) 
  { 
    this.device = data.device
    this.rectArray = []
    this.currect_rect = new Rect()
    this.isFirstPoint = true
    this.marked_fields = []
    
    

  }

   init_canvas(){
    var background = new Image()
    background.src = this.url;
    
    background.onload = () => {
      let devide_by = 1
      this.canvas.nativeElement.width  = background.width/devide_by;
      this.canvas.nativeElement.height  = background.height/devide_by;
      this.canvas.nativeElement.style.width  = background.width/devide_by+"px";
      this.canvas.nativeElement.style.height =  background.height/devide_by+"px";
        this.ctx.drawImage(background,0,0,background.width/devide_by,background.height/devide_by);   
        this.rectArray.forEach((rect : Rect)=> {
          this.ctx.strokeRect(rect.x1, rect.y1, (rect.x2-rect.x1), (rect.y2-rect.y1))
        });
    }
    
  }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    // this.canvas.nativeElement.width  = 400;
    // this.canvas.nativeElement.height  = 400;
    // this.canvas.nativeElement.style.width  = '400px';
    // this.canvas.nativeElement.style.height = '400px';
    var img = new window.Image();
    let ip = this.monService.getIp()
    
    this.url = ip+"/monitor_image/"+this.device.getDeviceId()
    // this.url = "https://thumbs.dreamstime.com/b/medical-monitor-12559727.jpg"
    
    this.init_canvas()
  }
    

    public onClick(event){
      
      console.log(event.clientX, event.clientY)
      var rect = this.canvas.nativeElement.getBoundingClientRect();
      this.offsetX = rect.left
      this.offsetY = rect.top
      
      if (this.isFirstPoint){
        this.currect_rect.x1 = event.clientX - this.offsetX
        this.currect_rect.y1 =  event.clientY - this.offsetY
        this.ctx.fillStyle = "#00FF00";
        this.ctx.fillRect(this.currect_rect.x1,this.currect_rect.y1,5,5);
        this.isFirstPoint = false
      }
      else
      {
        this.currect_rect.x2 = event.clientX - this.offsetX
        this.currect_rect.y2 = event.clientY - this.offsetY

        let top_left_x = Math.min(this.currect_rect.x1,this.currect_rect.x2)
        let top_left_y = Math.min(this.currect_rect.y1,this.currect_rect.y2)

        let bottom_right_x = Math.max(this.currect_rect.x1,this.currect_rect.x2)
        let bottom_right_y = Math.max(this.currect_rect.y1,this.currect_rect.y2)
     
        this.currect_rect.x1 = top_left_x
        this.currect_rect.y1 = top_left_y
        this.currect_rect.x2 = bottom_right_x
        this.currect_rect.y2 = bottom_right_y
        
        this.ctx.strokeStyle = "#0000FF";
        let width = Math.abs(this.currect_rect.x2-this.currect_rect.x1)
        let height = Math.abs(this.currect_rect.y2-this.currect_rect.y1)
        this.ctx.strokeRect(this.currect_rect.x1, this.currect_rect.y1, width , height)

        const dialogRef = this.dialog.open(MarkDialogComponent, {
          width: '250px',
        });
        dialogRef.afterClosed().subscribe(result => 
        {
          if(result)
          {

            console.log(this.currect_rect.x1, this.currect_rect.y1, width , height)

            console.log('The dialog was closed');

            this.marked_fields.push({"type":result, 
            "top-left":[this.currect_rect.x1,this.currect_rect.y1],
            "bottom-right":[this.currect_rect.x2,this.currect_rect.y2]
          })
            this.currect_rect = new Rect()
            console.log(this.marked_fields)
          }
        });
        
        this.rectArray.push(this.currect_rect)

        this.isFirstPoint = true
        // this.paintAllRects()
        
      }
     
     
    }
    private paintAllRects(){
      this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      this.init_canvas()
      // this.rectArray.forEach((rect : Rect)=> {
        // this.ctx.strokeRect(rect.x1, rect.y1, (rect.x2-rect.x1), (rect.y2-rect.y1))
      // });
    }
    public onMove(event){
      // this.ctx.clearRect(0,0,1000,1000)
      // this.paintAllRects()
      console.log(event.clientX, event.clientY)
      
    }


}

