import Renderer from './Renderer';

class ImageRenderer extends Renderer {
  constructor(image, position, size) {
    super();
    this.image = image;
    this.position = position;
    this.size = size;
  }

  draw(ctx) {
    this.drawImage(ctx, this.image, this.position, this.size);
  }
}

export default ImageRenderer;
