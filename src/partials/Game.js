import {
  SVG_NS,
  KEYS,
  PADDLEWIDTH,
  PADDLEHEIGHT,
  BOARDGAP,
  RADIUS
} from "../settings.js";
import Board from "./Board";
import Paddle from "./Paddle";
import Score from "./Score";
import Ball from "./Ball";

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

    this.paddle = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      (this.height - this.paddleHeight) / 2,
      KEYS.p1up,
      KEYS.p1down
    );

    this.paddle2 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.width - this.boardGap - this.paddleWidth,
      (this.height - this.paddleHeight) / 2,
      KEYS.p2up,
      KEYS.p2down
    );

    this.paddle3 = new Paddle(
      this.height,
      (this.paddleWidth),
      this.paddleHeight * 2,
      this.boardGap,
      (this.height - this.paddleHeight) / 2,
      KEYS.p1up,
      KEYS.p1down
    );

    this.paddle4 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight*2,
      this.width - this.boardGap - this.paddleWidth,
      (this.height - this.paddleHeight) / 2,
      KEYS.p2up,
      KEYS.p2down
    );

    this.ball = new Ball(RADIUS, this.width, this.height);
    this.ball2 = new Ball(RADIUS * 2, this.width, this.height);
    this.ball3 = new Ball(RADIUS / 3, this.width, this.height);

    this.score1 = new Score(this.width / 2 - 50, 30, 30);
    this.score2 = new Score(this.width / 2 + 25, 30, 30);

    document.addEventListener("keydown", event => {
      if (event.key === KEYS.pause) {
        this.pause = !this.pause;
      }
    });
  } 

  scoreBoard(svg) {
    if (this.paddle.getScore() === 15) {
      this.pause = true;
      this.score1.render(svg, "Player 1 Wins, Press F5 to play again!");
      this.reset();
 
    } else if (this.paddle2.getScore() === 15) {
      this.pause = true;
      this.score2.render(svg, "Player 2 Wins, Press F5 to play again!");
      this.reset();

    } else {
      this.score1.render(svg, this.paddle.getScore());
      this.score2.render(svg, this.paddle2.getScore());
    }
  }

  render() {
    if (this.pause) {
      return;
    }

    this.gameElement.innerHTML = " ";
    let svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);
    this.board.render(svg);
    this.paddle.render(svg);
    if (this.paddle.getScore() >= 5) {
      this.paddle3.render(svg, this.paddle, this.paddle2);
    }

    this.paddle2.render(svg);
    if (this.paddle2.getScore() >= 5) {
      this.paddle4.render(svg, this.paddle, this.paddle2);
    }

    this.ball.render(svg, this.paddle, this.paddle2);
    if (this.paddle.getScore() >= 5 || this.paddle2.getScore() >= 5) {
      this.ball2.render(svg, this.paddle, this.paddle2);
    }
    this.ball.render(svg, this.paddle, this.paddle2);
    if (this.paddle.getScore() >= 10 || this.paddle2.getScore() >= 10) {
      this.ball3.render(svg, this.paddle, this.paddle2);
    }

    this.scoreBoard(svg);
  }
}
