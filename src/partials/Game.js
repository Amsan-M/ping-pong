import { SVG_NS, KEYS, PADDLEWIDTH, PADDLEHEIGHT, BOARDGAP, RADIUS } from '../settings.js';
import Board from './Board';
import Paddle from './Paddle';
import Score from './Score';
import Ball from './Ball';



export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;
    this.pause = false;
    this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height);
    

    this.paddleWidth = PADDLEWIDTH;
    this.paddleHeight = PADDLEHEIGHT;
    this.boardGap = BOARDGAP;

    this.paddle = new Paddle(this.height, this.paddleWidth, this.paddleHeight, this.boardGap, ((this.height - this.paddleHeight) / 2),KEYS.p1up, KEYS.p1down);

    this.paddle2 = new Paddle(this.height,
      this.paddleWidth,
      this.paddleHeight,
      (this.width - this.boardGap) - this.paddleWidth,
      (this.height - this.paddleHeight) / 2,
      KEYS.p2up,
      KEYS.p2down
    );

    this.ball = new Ball(RADIUS,
      this.width,
      this.height
    );

    this.score1 = new Score(this.width / 2 -50, 30, 30);
    this.score2 = new Score(this.width / 2 + 25, 30, 30);

    document.addEventListener("keydown", event => {
      if (event.key === KEYS.pause){
        this.pause = !this.pause;
      }
    });

  }

  render() {
    if(this.pause){
      return;
    }
    this.gameElement.innerHTML = ' ';
    let svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttributeNS(null, 'width', this.width);
    svg.setAttributeNS(null, 'height', this.height);
    svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);
    this.board.render(svg);
    this.paddle.render(svg);
    this.paddle2.render(svg);
    this.ball.render(svg, this.paddle, this.paddle2);
    this.score1.render(svg, this.paddle.getScore());
    this.score2.render(svg, this.paddle2.getScore());
  }
}
