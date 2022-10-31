import { Scene } from "phaser";
import { Vec2, WeldJoint, Body, Fixture, Settings } from "planck-js";
import { colors } from "../colors";
import { HEIGHT, WIDTH } from "../config";
import {
  bodyTravelSpeed,
  debug,
  maxHeadVelocity,
  switchCooldownTime,
  worldScale,
} from "../constants";
import BaseScene from "../scenes/BaseScene";
import { RayCastClosest } from "../utils/Raycast";
import Entity from "./Entity";

interface NormalWithFixture {
  normal: Vec2;
  fixture: Fixture;
}

export default class Player extends Entity {
  bodyConfig = {
    width: 20,
    height: 60,
  };

  headConfig = {
    radius: 10,
    offsetY: -10,
  };

  // x = WIDTH / 2 - this.bodyConfig.width;
  // y = HEIGHT - 80 - this.bodyConfig.height;
  // y = 100;
  initialPosition: Vec2;

  cursors = this.scene.input.keyboard.createCursorKeys();

  constructor(scene: BaseScene, position: Vec2) {
    super(scene);
    this.initialPosition = position;
  }

  bodyRectangle: Phaser.GameObjects.Rectangle | null = null;
  headCircle: Phaser.GameObjects.Ellipse | null = null;
  container: Phaser.GameObjects.Container | null = null;
  body: Body | null = null;
  head: Body | null = null;
  touchingHeadNormals: NormalWithFixture[] = [];
  touchingBodyAndHead = false;

  rays: Phaser.GameObjects.Line[] = [];
  headRay: Phaser.GameObjects.Line | null = null;
  status: "body" | "head" = "body";
  joint: WeldJoint | null = null;
  flapsRemaining = 2;
  lastSwitchTime = 0;

  create() {
    const bodyPosition = {
      width: this.bodyConfig.width,
      height: this.bodyConfig.height,
      x: this.initialPosition.x,
      y: this.initialPosition.y,
    };

    this.body = this.scene.createBox2D({
      x: bodyPosition.x,
      y: bodyPosition.y,
      width: bodyPosition.width,
      height: bodyPosition.height,
      shape: "box",
      color: colors.lightBlue,
      isDynamic: true,
      asset: "robe",
    });

    this.body.setFixedRotation(true);

    this.head = this.scene.createBox2D({
      x: bodyPosition.x,
      y:
        bodyPosition.y -
        this.bodyConfig.height / 2 -
        this.headConfig.radius +
        this.headConfig.offsetY,
      radius: this.headConfig.radius,
      shape: "circle",
      color: colors.lightBlue,
      isDynamic: true,
      asset: "bat",
    });

    this.head.setAngularDamping(1);

    this.joint = this.scene.world.createJoint(
      new WeldJoint(
        {
          collideConnected: true,
          // dampingRatio: 0,
          frequencyHz: 10,
        },
        this.body,
        this.head,
        Vec2.add(this.head.getWorldCenter(), new Vec2(0, 10))
      )
    );

    this.rays.push(
      this.scene.add
        .line(0, 0, 0, 0, 100, 100, debug ? colors.white : undefined)
        .setOrigin(0, 0),
      this.scene.add
        .line(0, 0, 0, 0, 100, 100, debug ? colors.white : undefined)
        .setOrigin(0, 0),
      this.scene.add
        .line(0, 0, 0, 0, 100, 100, debug ? colors.white : undefined)
        .setOrigin(0, 0)
    );

    this.headRay = this.scene.add.line(
      0,
      0,
      0,
      0,
      0,
      0,
      debug ? colors.white : undefined
    );

    this.scene.world.on("begin-contact", (contact) => {
      if (this.status !== "head") {
        return;
      }

      let headFixture: Fixture | null = null;
      let otherFixture: Fixture | null = null;
      if (contact.getFixtureA() === this.head?.getFixtureList()) {
        headFixture = contact.getFixtureA();
        otherFixture = contact.getFixtureB();
      }
      if (contact.getFixtureB() === this.head?.getFixtureList()) {
        headFixture = contact.getFixtureB();
        otherFixture = contact.getFixtureA();
      }

      if (otherFixture === this.body?.getFixtureList()) {
        return;
      }

      if (headFixture && otherFixture) {
        this.touchingHeadNormals.push({
          normal: contact.v_normal,
          fixture: otherFixture,
        });
      }
    });

    this.scene.world.on("end-contact", (contact) => {
      if (this.status !== "head") {
        return;
      }

      let headFixture: Fixture | null = null;
      let otherFixture: Fixture | null = null;
      if (contact.getFixtureA() === this.head?.getFixtureList()) {
        headFixture = contact.getFixtureA();
        otherFixture = contact.getFixtureB();
      }
      if (contact.getFixtureB() === this.head?.getFixtureList()) {
        headFixture = contact.getFixtureB();
        otherFixture = contact.getFixtureA();
      }

      if (headFixture) {
        this.touchingHeadNormals = this.touchingHeadNormals.filter(
          (item) => item.fixture !== otherFixture
        );
      }
    });

    // this.scene.createBox2D({});

    // this.container = this.scene.add.container(this.x, this.y);

    // this.bodyBounds = this.scene.add.rectangle(
    //   this.x,
    //   this.y,
    //   this.bodyConfig.width,
    //   this.bodyConfig.height - this.headConfig.offsetY + this.headConfig.radius * 2,
    //   0xa83232,
    //   0xaaaaaa
    // );

    // this.scene.physics.add.existing(this.bodyBounds);

    // this.scene.physics.world.disable(this.headCircle);

    // (
    //   this.bodyRectangle.bodyConfig as Phaser.Physics.Arcade.Body
    // ).collideWorldBounds = true;
  }

  render(time: number, delta: number): void {
    if (this.status === "body") {
      this.renderBody(time, delta);
      return;
    }

    // console.log(this.touchingHead);
    this.renderHead(time, delta);
  }

  renderBody(time: number, delta: number) {
    let hit = false;

    if (this.body?.isKinematic()) {
      if (
        Vec2.distance(this.body.getPosition(), this.head!.getPosition()) < 1.0
      ) {
        this.body.setDynamic();

        const headTargetPos = {
          x: this.body.getPosition().x * worldScale,
          y:
            this.body.getPosition().y * worldScale -
            this.bodyConfig.height / 2 -
            this.headConfig.radius +
            this.headConfig.offsetY,
        };
        this.head?.setLinearVelocity(Vec2.zero());
        this.head?.setAngularVelocity(0);
        this.head?.setPosition(
          new Vec2(headTargetPos.x / worldScale, headTargetPos.y / worldScale)
        );

        // this.head?.setStatic();
        this.body.setStatic();
        this.body?.setLinearVelocity(Vec2.zero());

        if (this.head) {
          this.joint = this.scene.world.createJoint(
            new WeldJoint(
              {
                collideConnected: true,
                // dampingRatio: 0,
                frequencyHz: 10,
              },
              this.body,
              this.head!,
              Vec2.add(this.head.getWorldCenter(), new Vec2(0, 10))
            )
          );
        }

        this.body.setDynamic();
        this.head?.setDynamic();

        return;
      }

      const targetVector = Vec2.sub(
        this.head?.getPosition() ?? Vec2.zero(),
        this.body.getPosition()
      );
      this.body?.setPosition(Vec2.add(this.body.getPosition(), targetVector));
      return;
    }

    this.rays.forEach((ray, i) => {
      const multiplier = i - 1;
      RayCastClosest.reset();
      if (hit) {
        return;
      }
      const fromRay = Vec2.add(
        this.body?.getPosition() ?? Vec2.zero(),
        new Vec2(
          (-8 * multiplier) / worldScale,
          this.bodyConfig.height / worldScale / 2
        )
      );
      const toRay = Vec2.add(fromRay, new Vec2(0, 0.1));

      if (debug) {
        ray.setTo(
          fromRay.x * worldScale,
          fromRay.y * worldScale,
          toRay.x * worldScale,
          toRay.y * worldScale
        );
      }

      this.scene.world.rayCast(fromRay, toRay, RayCastClosest.callback);
      hit = RayCastClosest.hit;
    });

    const vel = this.body?.getLinearVelocity() ?? Vec2.zero();
    let desiredVelX = 0;
    let desiredVelY = 0;

    if (this.cursors.left.isDown) {
      desiredVelX = -2.5;
    } else if (this.cursors.right.isDown) {
      desiredVelX = 2.5;
    } else {
      // player.setVelocityX(0);
      // player.anims.play("turn");
    }

    if (this.cursors.up.isDown && hit) {
      desiredVelY = -10;
    }

    if (
      this.cursors.space.isDown &&
      time - this.lastSwitchTime > switchCooldownTime
    ) {
      this.lastSwitchTime = this.cursors.space.timeDown;
      this.switchToHead();
    }

    const velChangeX = (desiredVelX - vel.x) * 0.1;
    const impulseX = (this.body?.getMass() ?? 0) * velChangeX;

    const velChangeY = desiredVelY - vel.y;
    const impulseY = hit ? (this.body?.getMass() ?? 0) * velChangeY : 0;

    this.body?.applyLinearImpulse(
      new Vec2(impulseX, impulseY),
      this.body?.getWorldCenter(),
      true
    );
  }

  switchToHead() {
    console.log("SWITCHING TO HEAD");
    this.status = "head";
    this.touchingHeadNormals = [];
    if (this.joint) {
      this.scene.world.destroyJoint(this.joint);
      this.joint = null;
      this.body?.setKinematic();
    }
  }

  renderHead(time: number, delta: number) {
    let hit = false;

    const bodyPos = (this.body?.getPosition().y ?? 0) * worldScale;
    if (bodyPos < HEIGHT + 100) {
      this.body?.setPosition(
        Vec2.add(this.body.getPosition(), new Vec2(0, bodyTravelSpeed))
      );
    }

    const vel = this.head?.getLinearVelocity() ?? Vec2.zero();
    const angVel = this.head?.getAngularVelocity() ?? 0;
    let desiredVelX = 0;
    let desiredVelY = 0;

    if (this.cursors.left.isDown) {
      desiredVelX = -10.0;
    } else if (this.cursors.right.isDown) {
      desiredVelX = 10.0;
    } else {
      // player.setVelocityX(0);
      // player.anims.play("turn");
    }

    console.log("touchingHeadNormal: ", this.touchingHeadNormals);

    if (this.head) {
      RayCastClosest.reset();
      const fromRay = Vec2.add(
        this.head.getPosition() ?? Vec2.zero(),
        new Vec2(0, 0)
      );
      const toRay = Vec2.add(fromRay, new Vec2(0, -2.5));

      if (debug) {
        this.headRay?.setTo(
          fromRay.x * worldScale,
          fromRay.y * worldScale,
          toRay.x * worldScale,
          toRay.y * worldScale
        );
      }

      this.scene.world.rayCast(fromRay, toRay, RayCastClosest.callback);
      hit = RayCastClosest.hit;

      console.log("RAYCASTING", hit);
    }

    if (this.cursors.up.isDown && this.touchingHeadNormals.length) {
      desiredVelY = -5;
    }
    if (
      this.cursors.space.isDown &&
      time - this.lastSwitchTime > switchCooldownTime &&
      !hit
    ) {
      this.lastSwitchTime = this.cursors.space.timeDown;
      this.switchToBody();
    }

    const velChangeX = (desiredVelX - angVel) * 0.1;
    const impulseX = (this.head?.getMass() ?? 0) * velChangeX;

    this.head?.applyAngularImpulse(impulseX, true);
    if (this.touchingHeadNormals.length && this.cursors.up.isDown) {
      const normalWithFixture =
        this.touchingHeadNormals[this.touchingHeadNormals.length - 1];
      // console.log(this.head.normal);

      // console.table({ touchingHeadNormal: this.touchingHeadNormal });
      this.head?.applyLinearImpulse(
        Vec2.mul(normalWithFixture.normal, 2),
        this.head.getWorldCenter(),
        true
      );
    }

    if (this.head) {
      const velocity = this.head.getLinearVelocity();
      if (velocity.x > maxHeadVelocity) {
        velocity.x = maxHeadVelocity;
      }
      if (velocity.x < -maxHeadVelocity) {
        velocity.x = -maxHeadVelocity;
      }

      if (velocity.y > maxHeadVelocity) {
        velocity.y = maxHeadVelocity;
      }
      if (velocity.y < -maxHeadVelocity) {
        velocity.y = -maxHeadVelocity;
      }
    }
  }

  switchToBody() {
    console.log("SWITCHING TO BODY");
    this.status = "body";
    this.touchingHeadNormals = [];
    if (this.joint) {
      // this.scene.world.destroyJoint(this.joint);
      // this.body?.setKinematic();
    }
  }
}
