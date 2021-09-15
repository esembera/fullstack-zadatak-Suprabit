import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'trackgenre'}}
})
export class Trackgenre extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'trackid', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  trackid: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 2,
    postgresql: {columnName: 'genreid', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  genreid: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Trackgenre>) {
    super(data);
  }
}

export interface TrackgenreRelations {
  // describe navigational properties here
}

export type TrackgenreWithRelations = Trackgenre & TrackgenreRelations;
