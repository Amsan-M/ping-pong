import { SVG_NS } from '../settings.js';

export default class Paddle {
  constructor(boardHeight, width, height, x, y) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.score = 0;
  }
  //...

  render(svg) {
    let paddle = document.createElementNS(SVG_NS, 'rect');
    paddle.setAttributeNS(null, 'x', 20);
    paddle.setAttributeNS(null, 'y', 10);
    paddle.setAttributeNS(null, 'width', 8);
    paddle.setAttributeNS(null, 'height', 56);
    paddle.setAttributeNS(null, 'fill', 'white');

    let paddle2 = document.createElementNS(SVG_NS, 'rect');
    paddle2.setAttributeNS(null, 'x', 492);
    paddle2.setAttributeNS(null, 'y', 10);
    paddle2.setAttributeNS(null, 'width', 8);
    paddle2.setAttributeNS(null, 'height', 56);
    paddle2.setAttributeNS(null, 'fill', 'white');

    

    svg.appendChild(paddle);
    svg.appendChild(paddle2);
  }
}
