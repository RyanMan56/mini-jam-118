import BaseScene from "../scenes/BaseScene";

export default class Entity {
  scene: BaseScene;

  constructor(scene: BaseScene) {
    this.scene = scene;
  }

  preload() {}
  create() {}
  render(time: number, delta: number) {}
}
