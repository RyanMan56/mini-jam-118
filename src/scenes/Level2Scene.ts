import Phaser, { Scene } from "phaser";
import { colors } from "../colors";
import { HEIGHT, WIDTH } from "../config";
import EntityManager from "../entities/EntityManager";
import Player from "../entities/Player";
import BaseScene from "./BaseScene";
import { worldScale } from "../constants";
import { Vec2 } from "planck-js";

export default class Level2Scene extends BaseScene {
  constructor() {
    super("Level2Scene");

    this.entityManager = new EntityManager();
  }

  preload() {
    super.preload();
  }

  create() {
    super.create();

    this.player = new Player(this, new Vec2(WIDTH - 80, 100));
    this.entityManager.add(this.player);

    // Floor
    this.createBox2D({
      x: WIDTH / 2,
      y: HEIGHT - 10,
      width: WIDTH,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    // Ceiling
    this.createBox2D({
      x: WIDTH / 2,
      y: 10,
      width: WIDTH,
      height: 20,
      isDynamic: false,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    // Left wall
    this.createBox2D({
      x: 10,
      y: (HEIGHT + 150) / 2,
      width: 20,
      height: HEIGHT - 150,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    // Right wall
    this.createBox2D({
      x: WIDTH - 10,
      y: HEIGHT / 2,
      width: 20,
      height: HEIGHT,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: WIDTH - 200 / 2,
      y: 150,
      width: 200,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    // Platforms
    this.createBox2D({
      x: 480 + 50 / 2,
      y: 150,
      width: 30,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 380 + 50 / 2,
      y: 150,
      width: 30,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    // Pit
    this.createBox2D({
      x: 270 + 20 / 2,
      y: 250,
      width: 20,
      height: 180,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 270 + 350 / 2,
      y: 350,
      width: 350,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 600 + 20 / 2,
      y: 250,
      width: 20,
      height: 180,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    // Step
    this.createBox2D({
      x: 580 + 20 / 2,
      y: 240,
      width: 20,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 170 + 120 / 2,
      y: 150,
      width: 120,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    // Steps down
    this.createBox2D({
      x: 120 + 20 / 2,
      y: 150,
      width: 20,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    // Vertical separator
    this.createBox2D({
      x: 220 + 20 / 2,
      y: 360 + 180 / 2,
      width: 20,
      height: 180,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    // Bricks
    this.createBox2D({
      x: 130 + 20 / 2,
      y: 200 + 20 / 2,
      width: 20,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });
    this.createBox2D({
      x: 190 + 20 / 2,
      y: 220 + 20 / 2,
      width: 20,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });
    this.createBox2D({
      x: 240 + 20 / 2,
      y: 200 + 20 / 2,
      width: 20,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 165 + 20 / 2,
      y: 250 + 20 / 2,
      width: 20,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });
    this.createBox2D({
      x: 215 + 20 / 2,
      y: 250 + 20 / 2,
      width: 20,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 130 + 20 / 2,
      y: 300 + 20 / 2,
      width: 20,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });
    this.createBox2D({
      x: 190 + 20 / 2,
      y: 300 + 20 / 2,
      width: 20,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });
    this.createBox2D({
      x: 240 + 20 / 2,
      y: 300 + 20 / 2,
      width: 20,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 165 + 20 / 2,
      y: 350 + 20 / 2,
      width: 20,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });
    this.createBox2D({
      x: 215 + 20 / 2,
      y: 350 + 20 / 2,
      width: 20,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 130 + 20 / 2,
      y: 400 + 20 / 2,
      width: 20,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });
    this.createBox2D({
      x: 190 + 20 / 2,
      y: 400 + 20 / 2,
      width: 20,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });
    this.createBox2D({
      x: 240 + 20 / 2,
      y: 400 + 20 / 2,
      width: 20,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    // this.createBox2D({
    //   x: 165 + 20 / 2,
    //   y: 440 + 20 / 2,
    //   width: 20,
    //   height: 20,
    //   color: colors.darkBlue,
    //   shape: "box",
    //   asset: "tile",
    //   tileSprite: true,
    // });
    this.createBox2D({
      x: 215 + 20 / 2,
      y: 450 + 20 / 2,
      width: 20,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 130 + 20 / 2,
      y: 500 + 20 / 2,
      width: 20,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });
    this.createBox2D({
      x: 190 + 20 / 2,
      y: 500 + 20 / 2,
      width: 20,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });
    this.createBox2D({
      x: 240 + 20 / 2,
      y: 500 + 20 / 2,
      width: 20,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    // More vertical separators
    this.createBox2D({
      x: 320 + 20 / 2,
      y: 390 + 140 / 2,
      width: 20,
      height: 140,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 370 + 20 / 2,
      y: 360 + 70 / 2,
      width: 20,
      height: 70,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 370 + 20 / 2,
      y: 470 + 80 / 2,
      width: 20,
      height: 80,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 440 + 300 / 2,
      y: 390 + 140 / 2,
      width: 300,
      height: 140,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 680 + 20 / 2,
      y: 190 + 260 / 2,
      width: 20,
      height: 250,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    // Left side
    this.createBox2D({
      x: 100 + 20 / 2,
      y: HEIGHT / 2 - 0 - 50 / 2,
      width: 20,
      height: HEIGHT - 40 - 50,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    // Head lift
    this.createBox2D({
      x: 20 + 50 / 2,
      y: HEIGHT - 70 + 20 / 2,
      width: 50,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 50 + 50 / 2,
      y: HEIGHT - 130 + 20 / 2,
      width: 50,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });
    this.createBox2D({
      x: 70 + 50 / 2,
      y: HEIGHT - 120 + 20 / 2,
      width: 40,
      height: 20,
      color: colors.darkBlue,
      rotation: Phaser.Math.DegToRad(45),
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 20 + 50 / 2,
      y: HEIGHT - 190 + 20 / 2,
      width: 50,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });
    this.createBox2D({
      x: 0 + 50 / 2,
      y: HEIGHT - 180 + 20 / 2,
      width: 40,
      height: 20,
      color: colors.darkBlue,
      rotation: Phaser.Math.DegToRad(-45),
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 50 + 50 / 2,
      y: HEIGHT - 250 + 20 / 2,
      width: 50,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });
    this.createBox2D({
      x: 70 + 50 / 2,
      y: HEIGHT - 240 + 20 / 2,
      width: 40,
      height: 20,
      color: colors.darkBlue,
      rotation: Phaser.Math.DegToRad(45),
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 20 + 50 / 2,
      y: HEIGHT - 310 + 20 / 2,
      width: 50,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });
    this.createBox2D({
      x: 0 + 50 / 2,
      y: HEIGHT - 300 + 20 / 2,
      width: 40,
      height: 20,
      color: colors.darkBlue,
      rotation: Phaser.Math.DegToRad(-45),
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 50 + 50 / 2,
      y: HEIGHT - 360 + 20 / 2,
      width: 50,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });
    this.createBox2D({
      x: 70 + 50 / 2,
      y: HEIGHT - 350 + 20 / 2,
      width: 40,
      height: 20,
      color: colors.darkBlue,
      rotation: Phaser.Math.DegToRad(45),
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    // Bottom tunnel
    this.createBox2D({
      x: 100 + 640 / 2,
      y: HEIGHT - 70 + 20 / 2,
      width: 640,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });
  }

  update(time: number, delta: number) {
    super.update(time, delta);
  }
}
