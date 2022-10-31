// Box2D works with meters. We need to convert meters to pixels.
// let's say 30 pixels = 1 meter.
export const worldScale = 30;

export const debug = false;

export const maxHeadVelocity = 20.0;

export const bodyTravelSpeed = 0.2;

export const switchCooldownTime = 500;

export const sceneOrder = [
  {
    name: "Level1Scene",
    title: "The Crypt",
  },
  { name: "Level2Scene", title: "The Tunnels" },
  { name: "Level3Scene", title: "The Drop" },
];

export const gameTitle = "Roll on, Vampire!";
