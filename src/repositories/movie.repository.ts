import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostrgresqlDataSource} from '../datasources';
import {Movie, MovieRelations} from '../models';

export class MovieRepository extends DefaultCrudRepository<
  Movie,
  typeof Movie.prototype.trackid,
  MovieRelations
> {
  constructor(
    @inject('datasources.postrgresql') dataSource: PostrgresqlDataSource,
  ) {
    super(Movie, dataSource);
  }
}
