import Phaser from "phaser";
import { colors } from "./colors";
import Level1Scene from "./scenes/Level1Scene";
import Level2Scene from "./scenes/Level2Scene";
import Level3Scene from "./scenes/Level3Scene";
import TextScene from "./scenes/TextScene";
import TitleScene from "./scenes/TitleScene";

export const WIDTH = 800;
export const HEIGHT = 600;

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game",
  backgroundColor: colors.black,
  scale: {
    width: WIDTH,
    height: HEIGHT,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
  scene: [TitleScene, TextScene, Level1Scene, Level2Scene, Level3Scene],
};

export default config;
