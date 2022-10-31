import Phaser from "phaser";
import config from "./config";

new Phaser.Game(
  Object.assign(config, {
    scene: config.scene,
  })
);
