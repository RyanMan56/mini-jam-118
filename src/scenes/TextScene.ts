import { colors } from "../colors";
import { HEIGHT, WIDTH } from "../config";
import { gameTitle, sceneOrder } from "../constants";

interface Data {
  title?: string;
  text: string;
  nextLevel: string;
  completed?: boolean;
}

export default class TextScene extends Phaser.Scene {
  title: string = gameTitle;
  text: string = `Level 1 - ${sceneOrder[0].title}`;
  nextLevel: string = sceneOrder[0].name;
  completed = false;

  constructor() {
    super("TextScene");
  }

  preload() {
    this.load.image("tile_bg", "assets/tile_bg.png");
  }

  init(data: Data) {
    if (data.title) {
      this.title = data.title;
    }

    if (data.text) {
      this.text = data.text;
    }

    if (data.nextLevel) {
      this.nextLevel = data.nextLevel;
    }

    if (data.completed !== undefined) {
      this.completed = data.completed;
    }
  }

  create() {
    this.add
      .tileSprite(0, 0, WIDTH * 2, HEIGHT * 2, "tile_bg")
      .setInteractive(true);

    this.add
      .text(WIDTH / 2, HEIGHT / 3, this.title, { fontSize: "50px" })
      .setOrigin(0.5, 0.5);

    this.add
      .text(WIDTH / 2, (HEIGHT / 3) * 2, this.text, {
        align: "center",
      })
      .setOrigin(0.5, 0.5);

    if (!this.completed) {
      setTimeout(() => {
        this.scene.start(this.nextLevel);
      }, 3000);
    } else {
      setTimeout(() => {
        this.scene.start("TitleScene");
      }, 7000);
    }
  }
}
