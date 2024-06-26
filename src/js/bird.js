import { Actor, Vector, Shape, CollisionType, Color, Random, SpriteSheet, range, Animation } from "excalibur";
import { Resources } from "./resources";
import { Player } from "./player";
import { mathFunction } from "./mathFunctions";

export class Bird extends Actor {
    canDespawn = false;
    dir = 1;
    constructor(position, dir) {
        super()
        this.dir = dir;
        this.pos = position;
        this.pos.x *= dir;

        const runSheet = SpriteSheet.fromImageSource({
            image: Resources.Duck,
            grid: { rows: 2, columns: 5, spriteWidth: 114, spriteHeight: 117 }
        })

        const fly = Animation.fromSpriteSheet(runSheet, range(0, 8), 80)

        this.graphics.add("fly", fly)
        this.graphics.use('fly')
    }
    onInitialize(engine) {

        //console.log("Bird is created")

        //let spr = Resources.Bird.toSprite();
        this.scale = new Vector(-this.dir * 2, 2);

        //this.graphics.use(spr);

        // this.pos = new Vector(500, 300)

        this.vel = new Vector(this.dir * -mathFunction.Lerp(600, 1000, Math.random()), 0);
        let col = Shape.Circle(24)
        this.body.collisionType = CollisionType.Passive;
        this.collider.set(col);
        this.on("collisionstart", event => this.knockUp(event))
        this.on("enterviewport", event => this.markAsDespawnAble(event))
        this.on("exitviewport", event => this.killProjectile(event))

    }
    knockUp(event) {
        if (event.other instanceof Player && !Player.isGoku) {
           // console.log("collided With Player")
            event.other.knockUp(this.pos);
            Resources.KnockBack.play(0.5)
        }
    }

    markAsDespawnAble(event) {
        this.canDespawn = true;
    }
    killProjectile() {
        if (this.canDespawn) {
          //  console.log("killed")
            this.kill();
        }
    }
}