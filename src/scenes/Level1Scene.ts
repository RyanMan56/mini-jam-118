import Phaser, { Scene } from "phaser";
import { colors } from "../colors";
import { HEIGHT, WIDTH } from "../config";
import EntityManager from "../entities/EntityManager";
import Player from "../entities/Player";
import BaseScene from "./BaseScene";
import { sceneOrder, worldScale } from "../constants";
import { Vec2 } from "planck-js";

export default class Level1Scene extends BaseScene {
  constructor() {
    super("Level1Scene");

    this.entityManager = new EntityManager();
  }

  preload() {
    super.preload();
  }

  create() {
    super.create();

    this.add.rectangle(300, HEIGHT - 130, 550, 150, colors.darkBlue);
    this.add.rectangle(300, HEIGHT - 130, 530, 130, colors.black);
    this.add.text(
      50,
      HEIGHT - 170,
      "The Deep Catacombs ->\r\n\r\nUse the arrow keys to move\r\n\r\nPress space to switch between 'robe' and 'bat' forms",
      {
        color: "#e7f6f2",
        align: "center",
      }
    );

    this.player = new Player(this, new Vec2(80, HEIGHT - 100));
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
      y: (HEIGHT + 100) / 2,
      width: 20,
      height: HEIGHT - 100,
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
      x: 600,
      y: HEIGHT - 100,
      width: 100,
      height: 20,
      isDynamic: false,
      color: colors.darkBlue,
      shape: "box",
      rotation: Phaser.Math.DegToRad(360 - 45),
      asset: "tile",
      tileSprite: true,
    });

    // Right wall obstacles
    this.createBox2D({
      x: 700,
      y: (HEIGHT + 400) / 2 - 70,
      width: 20,
      height: HEIGHT - 400,
      isDynamic: false,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 700 + 20 / 2,
      y: HEIGHT - 60,
      width: 40,
      height: 20,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 700 + 20 / 2 + 70,
      y: HEIGHT - 160,
      width: 40,
      height: 20,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    // Second floor
    this.createBox2D({
      x: (WIDTH - 70) / 2,
      y: HEIGHT - 260,
      width: WIDTH - 70,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 700,
      y: 190,
      width: 20,
      height: HEIGHT - 400,
      isDynamic: false,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 580,
      y: HEIGHT - 320,
      width: 220,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    // Slope
    this.createBox2D({
      x: 470,
      y: 260,
      width: 20,
      height: 60,
      isDynamic: false,
      color: colors.darkBlue,
      shape: "box",
      // rotation: Phaser.Math.DegToRad(-10),
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 290,
      y: 250,
      width: 20,
      height: 60,
      isDynamic: false,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 380,
      y: 220,
      width: 200,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 380,
      y: 300,
      width: 20,
      height: 60,
      isDynamic: false,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 180,
      y: 290,
      width: 240,
      height: 20,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 650,
      y: 50,
      width: 140,
      height: 20,
      isDynamic: false,
      color: colors.darkBlue,
      shape: "box",
      rotation: Phaser.Math.DegToRad(45),
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 30,
      y: 240,
      width: 60,
      height: 20,
      isDynamic: false,
      color: colors.darkBlue,
      shape: "box",
      rotation: Phaser.Math.DegToRad(-45),
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 200 / 2,
      y: 160,
      width: 200,
      height: 120,
      isDynamic: false,
      color: colors.darkBlue,
      shape: "box",
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 280,
      y: 90,
      width: 200,
      height: 20,
      isDynamic: false,
      color: colors.darkBlue,
      shape: "box",
      rotation: Phaser.Math.DegToRad(-15),
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 560,
      y: 130,
      width: 80,
      height: 20,
      isDynamic: false,
      color: colors.darkBlue,
      shape: "box",
      // rotation: Phaser.Math.DegToRad(-15),
      asset: "tile",
      tileSprite: true,
    });

    this.createBox2D({
      x: 420,
      y: 90,
      width: 80,
      height: 20,
      isDynamic: false,
      color: colors.darkBlue,
      shape: "box",
      // rotation: Phaser.Math.DegToRad(-15),
      asset: "tile",
      tileSprite: true,
    });
  }

  update(time: number, delta: number) {
    super.update(time, delta);
  }
}
