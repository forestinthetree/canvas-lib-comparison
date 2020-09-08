/*global PIXI:true */

import poseToBody from "../drawing/pose-to-body";
import { BODY_PART_POINTS } from "../drawing/constants";

import poseExample from "../data/poseExample";
import poseExample2 from "../data/poseExample2";

const { Graphics, Application, Point } = PIXI;

const createBodyPart = ({ points, closeStroke = false }) => {
  const bodyPart = new Graphics();
  bodyPart.lineStyle(4, 0xffffff, 1);
  bodyPart.drawPolygon(points);
  bodyPart.geometry.graphicsData[0].shape.closeStroke = closeStroke;

  return bodyPart;
};

const createBody = ({ app, body }) => {
  Object.values(BODY_PART_POINTS).forEach(({ points, ...otherArgs }) => {
    const bodyPart = createBodyPart({
      points: points.map((bodyPartName) => {
        const { x, y } = body[bodyPartName];
        return new Point(x, y);
      }),
      ...otherArgs,
    });
    app.stage.addChild(bodyPart);
  });
};

const init = ({ image }) => {
  const { width, height } = image;

  const app = new Application({
    width,
    height,
    antialias: true,
    transparent: false,
    autoDensity: true,
    resolution: window.devicePixelRatio,
  });
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";

  // Make full screen
  // app.renderer.resize(window.innerWidth, window.innerHeight);

  // Add canvas to page
  document.body.appendChild(app.view);

  return app;
};

document.addEventListener("DOMContentLoaded", function () {
  const app = init({ image: poseExample.image });
  createBody({
    app,
    body: poseToBody({
      pose: poseExample.poses[0],
    }),
  });
  createBody({
    app,
    body: poseToBody({
      pose: poseExample2.poses[0],
    }),
  });
});
