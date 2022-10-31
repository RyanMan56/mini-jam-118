import { colors } from "../colors";
import { HEIGHT, WIDTH } from "../config";
import { gameTitle, sceneOrder } from "../constants";

interface Data {
  title?: string;
  text: string;
  nextLevel: string;
  completed?: boolean;
}

export default class TitleScene extends Phaser.Scene {
  bat: Phaser.GameObjects.Sprite | null = null;

  constructor() {
    super("TitleScene");
  }

  preload() {
    this.load.image("tile_bg", "assets/tile_bg.png");
    this.load.image("bat", "assets/bat.png");
  }

  create() {
    this.add.tileSprite(0, 0, WIDTH * 2, HEIGHT * 2, "tile_bg");

    this.add
      .text(WIDTH / 2, HEIGHT / 3, gameTitle, {
        fontSize: "50px",
        color: "#a5c9ca",
      })
      .setOrigin(0.5, 0.5);

    this.bat = this.add.sprite(WIDTH / 2, HEIGHT / 6, "bat").setScale(2);

    this.add.text(
      100,
      80,
      "I've drank too much blood\r\n\r\nand my head'z zpinning",
      {
        color: "#a5c9ca",
      }
    );

    this.add.text(
      WIDTH / 2 + 70,
      80,
      "Heelp me get back home to\r\n\r\nvfe Deep Catacombs!",
      {
        color: "#a5c9ca",
      }
    );

    this.add.text(
      WIDTH / 2 + 100,
      HEIGHT - 80,
      "Created by RyanMan56\r\n\r\nfor Mini Jam 118 - Vampires",
      {
        align: "right",
        color: "#a5c9ca",
      }
    );

    const startGameButton = this.add
      .text(WIDTH / 2, 370, "Start Game", {
        align: "center",
        fontSize: "30px",
        color: "#e7f6f2",
      })
      .setOrigin(0.5, 0.5)
      .setInteractive();

    startGameButton.on("pointerover", () => {
      startGameButton.setTint(colors.darkBlue);
    });

    startGameButton.on("pointerout", () => {
      startGameButton.setTint(undefined);
    });

    startGameButton.on("pointerdown", () => {
      this.scene.start("TextScene", {
        title: gameTitle,
        text: `Level 1 - ${sceneOrder[0].title}`,
        nextLevel: sceneOrder[0].name,
        completed: false,
      });
      // this.scene.start("Level1Scene");
      // this.scene.start("Level3Scene");
    });

    // this.add
    //   .text(WIDTH / 2, (HEIGHT / 3) * 2, this.text, {
    //     align: "center",
    //   })
    //   .setOrigin(0.5, 0.5);

    // if (!this.completed) {
    //   setTimeout(() => {
    //     this.scene.start(this.nextLevel);
    //   }, 5000);
    // }
  }

  update() {
    if (this.bat) {
      this.bat.angle += 2;
    }
  }
}
