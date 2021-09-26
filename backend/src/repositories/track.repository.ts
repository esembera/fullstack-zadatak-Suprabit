import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostrgresqlDataSource} from '../datasources';
import {Track, TrackRelations} from '../models';

export class TrackRepository extends DefaultCrudRepository<
  Track,
  typeof Track.prototype.trackid,
  TrackRelations
> {
  constructor(
    @inject('datasources.postrgresql') dataSource: PostrgresqlDataSource,
  ) {
    super(Track, dataSource);
  }
}
