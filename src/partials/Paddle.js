import { SVG_NS, PADDLESPEED } from "../settings.js";

export default class Paddle {
  constructor(boardHeight, width, height, x, y, up, down) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = PADDLESPEED;
    this.score = 0;

    document.addEventListener("keydown", event => {
      switch (event.key) {
        case up:
          this.up();
          break;
        case down:
          this.down();
          break;
      }
    });
  }

  getScore() {
    return this.score;
  }
  incrementScore() {
    this.score = this.score + 1;
  }

  up() {
    this.y = Math.max(0, this.y - this.speed);
  }

  down() {
    this.y = Math.min(this.boardHeight - this.height, this.y + this.speed);
  }

  coordinates() {
    let leftX = this.x;
    let rightX = this.x + this.width;
    let topY = this.y;
    let bottomY = this.y + this.height;
    return [leftX, rightX, topY, bottomY];
  }

  render(svg) {
    let paddle = document.createElementNS(SVG_NS, "rect");
    paddle.setAttributeNS(null, "x", this.x);
    paddle.setAttributeNS(null, "y", this.y);
    paddle.setAttributeNS(null, "width", this.width);
    paddle.setAttributeNS(null, "height", this.height);
    paddle.setAttributeNS(null, "fill", "#ffcc00");

    svg.appendChild(paddle);
  }
}
