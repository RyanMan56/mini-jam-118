import Entity from "./Entity";

export default class EntityManager {
  entities: Entity[] = [];

  create() {
    this.entities.forEach((entity) => {
      entity.create();
    });
  }

  render(time: number, delta: number) {
    this.entities.forEach((entity) => {
      entity.render(time, delta);
    });
  }

  add(entity: Entity) {
    entity.create();
    this.entities.push(entity);
  }
}
