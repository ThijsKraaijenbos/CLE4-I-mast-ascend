import {ScreenElement, Vector, Text, Font, FontUnit, Color, GraphicsGroup, Actor, Rectangle, Timer, System} from "excalibur";
import {Resources} from "./resources.js";
export class gameTimer extends ScreenElement {

    pI = 0;
    s=0
    m=0
    h=0
    
    time = 0;
    game
    scoreText
    constructor() {
        super({x: 0, y: 0})
    }

    onInitialize(engine) {
        this.z =10000
        this.scoreText = new Text({
            text: '0',
            font: new Font({
                unit: FontUnit.Px,
                family: 'PressStart',
                size: 60,
            }),
            color: Color.White
        })
 
        this.graphics.use(this.scoreText);
        this.graphics.offset=new Vector(500,50);
    }
    
    onPreUpdate(_engine, _delta) 
    {
        super.onPreUpdate(_engine, _delta);
        //console.log(_delta);
        this.time+=_delta;
    
        let i = Math.floor(this.time%1001);
      
        if(i<this.pI)
        {
          console.log("sec");
          this.s++;
        }
        if(this.s==60)
        {
          this.s = 0;
          this.m++;  
        }
        if(this.m==60)
            {
                this.m = 0;
                this.h++;
            }
        this.pI = i;

        let hs = this.h.toString();
        let ms = this.m.toString();
        let ss = this.s.toString();
        if(this.h<10)
        {
            hs = "0"+this.h.toString();
        }
        if(this.m<10)
        {
                ms = "0"+this.m.toString();
        }
        if(this.s<10)
        {
            ss = "0"+this.s.toString();
        }
        this.scoreText.text=hs+":"+ms+":"+ss;
     
    }
}