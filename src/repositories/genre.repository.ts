import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostrgresqlDataSource} from '../datasources';
import {Genre, GenreRelations} from '../models';

export class GenreRepository extends DefaultCrudRepository<
  Genre,
  typeof Genre.prototype.genreid,
  GenreRelations
> {
  constructor(
    @inject('datasources.postrgresql') dataSource: PostrgresqlDataSource,
  ) {
    super(Genre, dataSource);
  }
}
