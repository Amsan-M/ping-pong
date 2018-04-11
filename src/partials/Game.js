import { SVG_NS } from '../settings.js';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';


export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;
    this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height);
    this.paddle = new Paddle(
      this.paddleWidth,
      this.paddleHeight,
      this.boardHeight,
      this.speed,
      this.score,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.ball = new Ball(
      this.radius,
      this.direction,
      this.boardHeight,
      this.boardWidth
    );

    // Other code goes here...
  }

  render() {
    // More code goes here...
    this.gameElement.innerHTML = ' ';
    let svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttributeNS(null, 'width', this.width);
    svg.setAttributeNS(null, 'height', this.height);
    svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);

    this.board.render(svg);
    this.paddle.render(svg);
    this.ball.render(svg);
  }
}
