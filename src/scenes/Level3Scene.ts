import Phaser, { Scene } from "phaser";
import { colors } from "../colors";
import { HEIGHT, WIDTH } from "../config";
import EntityManager from "../entities/EntityManager";
import Player from "../entities/Player";
import BaseScene from "./BaseScene";
import { worldScale } from "../constants";
import { Vec2 } from "planck-js";

export default class Level3Scene extends BaseScene {
  constructor() {
    super("Level3Scene");

    this.entityManager = new EntityManager();
  }

  preload() {
    super.preload();
  }

  create() {
    super.create();

    this.add.rectangle(380 - 50, 85, 580, 95, colors.darkBlue);
    this.add.rectangle(380 - 50, 85, 560, 75, colors.black);
    this.add.text(
      80,
      65,
      "Veell, vfiz iz my ztop. Vhankz for vfe heelp, friend.\r\n\r\nremind me never to drink vfat much blood again!",
      {
        color: "#e7f6f2",
        align: "center",
      }
    );

    this.player = new Player(this, new Vec2(WIDTH - 80, 100));
    this.entityManager.add(this.player);

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

    /// Right wall
    this.createBox2D({
      x: 10,
      y: HEIGHT / 2,
      width: 20,
      height: HEIGHT,
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

    const dropWidth = 100;

    //
    this.createBox2D({
      x: (WIDTH / 2 - dropWidth) / 2,
      y: (HEIGHT + 150) / 2,
      width: WIDTH / 2 - dropWidth,
      height: HEIGHT - 150,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: WIDTH / 2 / 2 + WIDTH / 2 + dropWidth,
      y: (HEIGHT + 150) / 2,
      width: WIDTH / 2,
      height: HEIGHT - 150,
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
