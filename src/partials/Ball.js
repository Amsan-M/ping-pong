import { SVG_NS } from '../settings.js';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.ping = new Audio ('public/sounds/pong-01.wav');
    this.reset();
  }

  paddleCollision(paddle, paddle2) {
    if (this.vx > 0) {
      // check for player 2 collision
      let [leftX, rightX, topY, bottomY] = paddle2.coordinates();
      if (
        (this.x + this.radius >= leftX) &&
        (this.x + this.radius <= rightX) &&
        (this.y >= topY && this.y <= bottomY))
       {this.ping.play();
        this.vx = this.vx * -1;
      }
    } else {
      let [leftX, rightX, topY, bottomY] = paddle.coordinates();
      if (
        (this.x - this.radius <= rightX) &&
        (this.x - this.radius >= leftX) &&
        (this.y >= topY && this.y <= bottomY)) {
          this.ping.play();
        this.vx = this.vx * -1;
      }
      // check for player 1 collision
    }
  }

  wallCollision(paddle,paddle2) {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if (hitLeft) {
      
      this.direction = -this.direction;
      this.reset();
      paddle2.incrementScore();
    }else if (hitRight){
      this.direction = -this.direction;
      this.reset();
      paddle.incrementScore();
    } else if (hitTop || hitBottom) {
      this.vy = -this.vy;
    }
  }

  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;

    // this.vy = 0;

    do {
      this.vy = Math.floor(Math.random() * 10 - 5);
    } while (this.vy === 0) 

    this.vx = this.direction * (6 - Math.abs(this.vy));
  }

  render(svg, paddle1, paddle2) {

    this.x += this.vx;
    this.y += this.vy;

    this.wallCollision(paddle1,paddle2);
    this.paddleCollision(paddle1, paddle2);
    

    let ball = document.createElementNS(SVG_NS, 'circle');
    ball.setAttributeNS(null, 'cx', this.x);
    ball.setAttributeNS(null, 'cy', this.y);
    ball.setAttributeNS(null, 'fill', 'white');
    ball.setAttributeNS(null, 'r', this.radius);

    svg.appendChild(ball);
  }
}
