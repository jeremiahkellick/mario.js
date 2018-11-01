import GameObject from './GameObject';
import ImageRenderer from '../components/renderers/ImageRenderer';
import Collider from '../components/Collider';
import Vector from '../Vector';
import { extractFileName } from '../util';
import stage from '../tilesets/stage.json';
import Transform from '../components/Transform';
import Game from '../Game';
import createMario from './createMario';
import createGoomba from './createGoomba';
import { stageImage } from '../files';

const tilesetsByFileName = { 'stage': stage };
const imagesByFileName = { 'stage': stageImage };

const loadTilemap = (tilemap, tiles) => {
  Game.mapSize = new Vector(
    tilemap.width * tilemap.tilewidth * 2,
    tilemap.height * tilemap.tileheight * 2
  );
  tilemap.layers.forEach(layer => {
    if (layer.type === 'tilelayer') {
      loadTileLayer(tilemap, layer);
    }

    if (layer.type === 'objectgroup') {
      loadObjectLayer(layer);
    }
  });
};

const loadTileLayer = (tilemap, layer) => {
  layer.data.forEach((gid, idx) => {
    if (gid === 0) return;
    const row = Math.floor(idx / layer.width);
    const col = idx % layer.width;
    const worldPosition = new Vector(
      col * tilemap.tilewidth * 2 + tilemap.tilewidth,
      row * tilemap.tileheight * 2 + tilemap.tilewidth
    );
    const tile = new GameObject();
    tile.addComponent(new Transform(worldPosition));
    const { image, position, size } = getImageData(tilemap.tilesets, gid);
    tile.addComponent(new ImageRenderer(image, position, size));
  });
};

const loadObjectLayer = layer => {
  if (layer.name === 'Collision') {
    layer.objects.forEach(({ x, y, width, height, type }) => {
      const obstacle = new GameObject();
      obstacle.addComponent(
        new Transform(new Vector(x * 2 + width, y * 2 + height))
      );
      const oneDirection = type === 'onedirection';
      obstacle.addComponent(
        new Collider(
          'obstacle',
          new Vector(width * 2, height * 2),
          false,
          oneDirection
        )
      );
    });
  } else if (layer.name === 'Spawn') {
    layer.objects.forEach(object => spawn(object));
  }
};

const spawn = object => {
  const position = new Vector(object.x * 2, object.y * 2);
  switch (object.name) {
    case 'mario':
      createMario(position);
      break;
    case 'goomba':
      createGoomba(position);
      break;
  }
};

const getImageData = (tilesets, gid) => {
  const tilesetData = getTilesetData(tilesets, gid);
  const fileName = extractFileName(tilesetData.source);
  const tileset = tilesetsByFileName[fileName];
  const id = gid - tilesetData.firstgid;
  const image = imagesByFileName[extractFileName(tileset.image)];
  return {
    image,
    position: getTilePosition(tileset, id),
    size: new Vector(tileset.tilewidth, tileset.tileheight)
  };
};

const getTilePosition = (tileset, id) => {
  const row = Math.floor(id / tileset.columns);
  const col = id % tileset.columns;
  return new Vector(
    col * tileset.tilewidth + tileset.margin + col * tileset.spacing,
    row * tileset.tileheight + tileset.margin + row * tileset.spacing
  );
};

const getTilesetData = (tilesets, gid) => {
  for (let i = 0; i < tilesets.length; i++) {
    const gidInTileset = (
      gid >= tilesets[i].firstgid
      && (!tilesets[i + 1] || gid < tilesets[i + 1].firstgid)
    );
    if (gidInTileset) return tilesets[i];
  }
};

export default loadTilemap;
