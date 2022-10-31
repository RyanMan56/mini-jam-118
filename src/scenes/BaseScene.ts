import Phaser from "phaser";
import EntityManager from "../entities/EntityManager";
import planck, { Settings, Shape, Vec2 } from "planck-js";
import { ShapeType } from "planck-js/lib/shape/index";
import { sceneOrder, worldScale } from "../constants";
import config, { HEIGHT, WIDTH } from "../config";
import { colors } from "../colors";
import Player from "../entities/Player";
import Entity from "../entities/Entity";

interface CreateBox2DBoxParams {
  width: number;
  height: number;
  radius?: number;
}

interface CreateBox2DCircleParams {
  width?: number;
  height?: number;
  radius: number;
}

type CreateBox2DParams = {
  x: number;
  y: number;
  rotation?: number;
  shape: ShapeType | "box";
  isDynamic?: boolean;
  color?: number;
  asset?: string;
  tileSprite?: boolean;
} & (CreateBox2DBoxParams | CreateBox2DCircleParams);

export default class BaseScene extends Phaser.Scene {
  entityManager: EntityManager;

  // world gravity, as a Vec2 object. It's just a x, y vector
  gravity = planck.Vec2(0, 3);

  // this is how we create a Box2D world
  world = planck.World(this.gravity);

  player: Player | null = null;

  config: string | Phaser.Types.Scenes.SettingsConfig;

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);

    this.config = config;
    this.entityManager = new EntityManager();
  }

  preload() {
    this.load.image("background", "assets/catacombs.png");
    this.load.image("bat", "assets/bat.png");
    this.load.image("robe", "assets/robe.png");
    this.load.image("tile", "assets/tile.png");
    this.load.image("tile_bg", "assets/tile_bg.png");
  }

  create() {
    // this.add.rectangle(0, 0, WIDTH, HEIGHT, colors.black).setOrigin(0, 0);
    this.add.tileSprite(0, 0, WIDTH * 2, HEIGHT * 2, "tile_bg");
  }

  update(time: number, delta: number) {
    this.entityManager.render(time, delta);

    const headPos = Vec2.mul(
      this.player?.head?.getPosition() ?? Vec2.zero(),
      worldScale
    );
    if (headPos) {
      const levelComplete =
        headPos.x < 0 ||
        headPos.x > WIDTH ||
        headPos.y < 0 ||
        headPos.y > HEIGHT;

      if (levelComplete) {
        const currentScene = sceneOrder.findIndex(
          (value) => value.name === this.config
        );
        const nextScene = sceneOrder[currentScene + 1];
        console.log({ currentScene, nextScene });
        if (nextScene) {
          this.scene.start("TextScene", {
            text: `Level ${currentScene + 2} - ${nextScene.title}`,
            nextLevel: nextScene.name,
          });
          return;
        }

        console.log("COMPLETED THE GAME!!!");
        this.scene.start("TextScene", {
          title: "Congratulations!",
          text: "You have completed the game!\r\n\r\nDon't forget to leave feedback! :)",
          completed: true,
        });
        // COMPLETED THE GAME
        return;
      }
    }

    // advance the simulation by 1/20 seconds
    this.world.step(1 / 30);

    // crearForces  method should be added at the end on each step
    this.world.clearForces();

    // iterate through all bodies
    for (let b = this.world.getBodyList(); b; b = b.getNext()) {
      // get body position
      let bodyPosition = b.getPosition();

      // get body angle, in radians
      let bodyAngle = b.getAngle();

      // get body user data, the graphics object
      let userData = b.getUserData();

      // adjust graphic object position and rotation
      // @ts-ignore
      userData.x = bodyPosition.x * worldScale;
      // @ts-ignore
      userData.y = bodyPosition.y * worldScale;
      // @ts-ignore
      userData.rotation = bodyAngle;
    }
  }

  createBox2D({
    x,
    y,
    width,
    height,
    rotation,
    shape,
    isDynamic,
    color,
    radius,
    asset,
    tileSprite,
  }: CreateBox2DParams) {
    // this is how we create a generic Box2D body
    let box = this.world.createBody();
    if (isDynamic) {
      // Box2D bodies born as static bodies, but we can make them dynamic
      box.setDynamic();
    }

    let fixtureShape: Shape | null = null;
    let fixturePosition: Vec2 | null = null;
    switch (shape) {
      case "box": {
        fixtureShape = planck.Box(
          width! / 2 / worldScale,
          height! / 2 / worldScale
        );
        fixturePosition = planck.Vec2(x / worldScale, y / worldScale);
        break;
      }
      case "circle": {
        fixtureShape = planck.Circle(radius! / worldScale);
        fixturePosition = planck.Vec2(x / worldScale, y / worldScale);
        break;
      }
      default:
        break;
    }

    if (fixtureShape) {
      // a body can have one or more fixtures. This is how we create a box fixture inside a body
      box.createFixture(fixtureShape);
    }

    if (fixturePosition) {
      if (rotation) {
        box.setTransform(fixturePosition, rotation);
      } else {
        // now we place the body in the world
        box.setPosition(fixturePosition);
      }
    }

    // time to set mass information
    box.setMassData({
      mass: 1,
      center: planck.Vec2(),

      // I have to say I do not know the meaning of this "I", but if you set it to zero, bodies won't rotate
      I: 1,
    });

    // now we create a graphics object representing the body
    const randomColor = new Phaser.Display.Color();
    randomColor.random();
    randomColor.brighten(50).saturate(100);

    if (!asset) {
      const userData = this.add.graphics();
      userData.fillStyle(color || randomColor.color, 1);

      switch (shape) {
        case "box": {
          userData.fillRect(-width! / 2, -height! / 2, width!, height!);
          break;
        }
        case "circle": {
          userData.fillCircle(0, 0, radius!);
          break;
        }
        default:
          break;
      }

      box.setUserData(userData);
      return box;
    }

    if (tileSprite) {
      const userData = this.add.tileSprite(
        -width! / 2,
        -height! / 2,
        width!,
        height!,
        asset
      );
      box.setUserData(userData);

      return box;
    }

    const userData = this.add.image(-width! / 2, -height! / 2, asset);
    box.setUserData(userData);

    // a body can have anything in its user data, normally it's used to store its sprite
    return box;
  }
}
