import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostrgresqlDataSource} from '../datasources';
import {Trackgenre, TrackgenreRelations} from '../models';

export class TrackgenreRepository extends DefaultCrudRepository<
  Trackgenre,
  typeof Trackgenre.prototype.trackid,
  TrackgenreRelations
> {
  constructor(
    @inject('datasources.postrgresql') dataSource: PostrgresqlDataSource,
  ) {
    super(Trackgenre, dataSource);
  }
}
