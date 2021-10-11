import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Genre} from './genre.model';
import {Trackgenre} from './trackgenre.model';
import {Movie} from './movie.model';

@model({settings: {idInjection: false, postgresql: {schema: 'public', table: 'track'}}})
export class Track extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'trackid', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  trackid: number;

  @property({
    type: 'string',
    required: true,
    length: 50,
    postgresql: {columnName: 'tracktitle', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  tracktitle: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {columnName: 'releasedate', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  releasedate: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'duration', dataType: 'interval', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  duration: string;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'tagrestriction', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  tagrestriction?: number;

  @property({
    type: 'number',
    precision: 5,
    scale: 2,
    postgresql: {columnName: 'trackrating', dataType: 'numeric', dataLength: null, dataPrecision: 5, dataScale: 2, nullable: 'YES'},
  })
  trackrating?: number;

  @property({
    type: 'string',
  })
  email?: string;

  @hasMany(() => Genre, {through: {model: () => Trackgenre}})
  genres: Genre[];

  @hasOne(() => Movie)
  movie: Movie;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Track>) {
    super(data);
  }
}

export interface TrackRelations {
  // describe navigational properties here
}

export type TrackWithRelations = Track & TrackRelations;
