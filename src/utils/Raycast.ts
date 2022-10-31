import { Fixture, Vec2 } from "planck-js";

interface Def {
  hit: boolean;
  point: Vec2 | null;
  normal: Vec2 | null;
  reset: () => void;
  callback: (
    fixture: Fixture,
    point: Vec2,
    normal: Vec2,
    fraction: number
  ) => number;
}

export const RayCastClosest = (function () {
  const def: Def = {
    hit: false,
    point: null,
    normal: null,
    reset: function () {
      def.hit = false;
      def.point = null;
      def.normal = null;
    },
    callback: function (fixture, point, normal, fraction) {
      var body = fixture.getBody();
      var userData = body.getUserData();
      if (userData) {
        if (userData === 0) {
          // By returning -1, we instruct the calling code to ignore this fixture and
          // continue the ray-cast to the next fixture.
          return -1.0;
        }
      }

      def.hit = true;
      def.point = point;
      def.normal = normal;

      // By returning the current fraction, we instruct the calling code to clip the ray and
      // continue the ray-cast to the next fixture. WARNING: do not assume that fixtures
      // are reported in order. However, by clipping, we can always get the closest fixture.
      return fraction;
    },
  };

  return def;
})();
