import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {PostrgresqlDataSource} from '../datasources';
import {Track, TrackRelations, Genre, Trackgenre, Movie} from '../models';
import {TrackgenreRepository} from './trackgenre.repository';
import {GenreRepository} from './genre.repository';
import {MovieRepository} from './movie.repository';

export class TrackRepository extends DefaultCrudRepository<
  Track,
  typeof Track.prototype.trackid,
  TrackRelations
> {

  public readonly genres: HasManyThroughRepositoryFactory<Genre, typeof Genre.prototype.genreid,
          Trackgenre,
          typeof Track.prototype.trackid
        >;

  public readonly movie: HasOneRepositoryFactory<Movie, typeof Track.prototype.trackid>;

  constructor(
    @inject('datasources.postrgresql') dataSource: PostrgresqlDataSource, @repository.getter('TrackgenreRepository') protected trackgenreRepositoryGetter: Getter<TrackgenreRepository>, @repository.getter('GenreRepository') protected genreRepositoryGetter: Getter<GenreRepository>, @repository.getter('MovieRepository') protected movieRepositoryGetter: Getter<MovieRepository>,
  ) {
    super(Track, dataSource);
    this.movie = this.createHasOneRepositoryFactoryFor('movie', movieRepositoryGetter);
    this.registerInclusionResolver('movie', this.movie.inclusionResolver);
    this.genres = this.createHasManyThroughRepositoryFactoryFor('genres', genreRepositoryGetter, trackgenreRepositoryGetter,);
    this.registerInclusionResolver('genres', this.genres.inclusionResolver);
  }
}
