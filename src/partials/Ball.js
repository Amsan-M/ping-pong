import { SVG_NS } from '../settings.js';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
  }

  render(svg) {
    let ball = document.createElementNS(SVG_NS, 'circle');
    ball.setAttributeNS(null, 'cx', '256');
    ball.setAttributeNS(null, 'cy', '128');
    ball.setAttributeNS(null, 'fill', 'white');
    ball.setAttributeNS(null, 'r', '8');

    svg.appendChild(ball);
  }
}
