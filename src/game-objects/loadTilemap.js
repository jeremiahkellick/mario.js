import GameObject from './GameObject';
import ImageRenderer from '../components/renderers/ImageRenderer';
import Collider from '../components/Collider';
import Vector from '../Vector';
import { extractFileName } from '../util';
import Transform from '../components/Transform';
import Game from '../Game';
import createMario from './createMario';
import createGoomba from './createGoomba';
import createMysteryBlock from './createMysteryBlock';
import stage from '../tilesets/stage.json';
import { stageImage } from '../files';
import createBoxCoin from './createBoxCoin';
import createMushroom from './createMushroom';

const tilesetsByFileName = { 'stage': stage };
const imagesByFileName = { 'stage': stageImage };

const loadTilemap = tilemap => {
  Game.mapSize = new Vector(
    tilemap.width * tilemap.tilewidth * 2,
    tilemap.height * tilemap.tileheight * 2
  );
  tilemap.layers.forEach(layer => {
    if (layer.type === 'tilelayer') {
      loadTileLayer(layer, tilemap);
    }

    if (layer.type === 'objectgroup') {
      loadObjectLayer(layer, tilemap.tilesets);
    }
  });
};

const loadTileLayer = (layer, tilemap) => {
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
    const { image, position, size } = getImageData(gid, tilemap.tilesets);
    tile.addComponent(new ImageRenderer(image, position, size));
  });
};

const loadObjectLayer = (layer, tilesets) => {
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
    layer.objects.forEach(object => spawn(object, tilesets));
  }
};

const spawn = (object, tilesets) => {
  const position = new Vector(
    object.x * 2 + object.width,
    object.y * 2
  );
  switch (getObjectType(object, tilesets)) {
    case 'mario':
      createMario(position);
      break;
    case 'goomba':
      createGoomba(position);
      break;
    case 'mysteryblock':
      mysteryBlockFromTiledObject(object);
      break;
  }
};

const mysteryBlockFromTiledObject = object => {
  const position = new Vector(
    object.x * 2 + object.width,
    object.y * 2
  );
  switch (object.name) {
    case 'mushroom':
      createMysteryBlock(position, createMushroom);
      break;
    default:
      createMysteryBlock(position, createBoxCoin);
  }
};

const getImageData = (gid, tilesets) => {
  const tilesetData = getTilesetData(gid, tilesets);
  const tileset = getTileset(tilesetData);
  const id = gid - tilesetData.firstgid;
  const image = imagesByFileName[extractFileName(tileset.image)];
  return {
    image,
    position: getTilePosition(id, tileset),
    size: new Vector(tileset.tilewidth, tileset.tileheight)
  };
};

const getTilePosition = (id, tileset) => {
  const row = Math.floor(id / tileset.columns);
  const col = id % tileset.columns;
  return new Vector(
    col * tileset.tilewidth + tileset.margin + col * tileset.spacing,
    row * tileset.tileheight + tileset.margin + row * tileset.spacing
  );
};

const getTilesetData = (gid, tilesets) => {
  for (let i = 0; i < tilesets.length; i++) {
    const gidInTileset = (
      gid >= tilesets[i].firstgid
      && (!tilesets[i + 1] || gid < tilesets[i + 1].firstgid)
    );
    if (gidInTileset) return tilesets[i];
  }
};

const getTileset = tilesetData => {
  const fileName = extractFileName(tilesetData.source);
  return  tilesetsByFileName[fileName];
};

const getObjectType = (object, tilesets) => {
  if (!object.type && object.gid) {
    const tilesetData = getTilesetData(object.gid, tilesets);
    const tileset = getTileset(tilesetData);
    const id = object.gid - tilesetData.firstgid;
    const tiles = tileset.tiles;
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i].id === id) return tiles[i].type;
    }
  } else {
    return object.type;
  }
};

export default loadTilemap;
