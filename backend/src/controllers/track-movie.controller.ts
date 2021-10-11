import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Track,
  Movie,
} from '../models';
import {TrackRepository} from '../repositories';

export class TrackMovieController {
  constructor(
    @repository(TrackRepository) protected trackRepository: TrackRepository,
  ) { }

  @get('/tracks/{id}/movie', {
    responses: {
      '200': {
        description: 'Track has one Movie',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Movie),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Movie>,
  ): Promise<Movie> {
    return this.trackRepository.movie(id).get(filter);
  }

  @post('/tracks/{id}/movie', {
    responses: {
      '200': {
        description: 'Track model instance',
        content: {'application/json': {schema: getModelSchemaRef(Movie)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Track.prototype.trackid,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movie, {
            title: 'NewMovieInTrack',
            exclude: ['trackid'],
            optional: ['trackId']
          }),
        },
      },
    }) movie: Omit<Movie, 'trackid'>,
  ): Promise<Movie> {
    return this.trackRepository.movie(id).create(movie);
  }

  @patch('/tracks/{id}/movie', {
    responses: {
      '200': {
        description: 'Track.Movie PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movie, {partial: true}),
        },
      },
    })
    movie: Partial<Movie>,
    @param.query.object('where', getWhereSchemaFor(Movie)) where?: Where<Movie>,
  ): Promise<Count> {
    return this.trackRepository.movie(id).patch(movie, where);
  }

  @del('/tracks/{id}/movie', {
    responses: {
      '200': {
        description: 'Track.Movie DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Movie)) where?: Where<Movie>,
  ): Promise<Count> {
    return this.trackRepository.movie(id).delete(where);
  }
}
