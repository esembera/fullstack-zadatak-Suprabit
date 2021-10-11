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
Trackgenre,
Genre,
} from '../models';
import {TrackRepository} from '../repositories';

export class TrackGenreController {
  constructor(
    @repository(TrackRepository) protected trackRepository: TrackRepository,
  ) { }

  @get('/tracks/{id}/genres', {
    responses: {
      '200': {
        description: 'Array of Track has many Genre through Trackgenre',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Genre)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Genre>,
  ): Promise<Genre[]> {
    return this.trackRepository.genres(id).find(filter);
  }

  @post('/tracks/{id}/genres', {
    responses: {
      '200': {
        description: 'create a Genre model instance',
        content: {'application/json': {schema: getModelSchemaRef(Genre)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Track.prototype.trackid,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Genre, {
            title: 'NewGenreInTrack',
            exclude: ['genreid'],
          }),
        },
      },
    }) genre: Omit<Genre, 'genreid'>,
  ): Promise<Genre> {
    return this.trackRepository.genres(id).create(genre);
  }

  @patch('/tracks/{id}/genres', {
    responses: {
      '200': {
        description: 'Track.Genre PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Genre, {partial: true}),
        },
      },
    })
    genre: Partial<Genre>,
    @param.query.object('where', getWhereSchemaFor(Genre)) where?: Where<Genre>,
  ): Promise<Count> {
    return this.trackRepository.genres(id).patch(genre, where);
  }

  @del('/tracks/{id}/genres', {
    responses: {
      '200': {
        description: 'Track.Genre DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Genre)) where?: Where<Genre>,
  ): Promise<Count> {
    return this.trackRepository.genres(id).delete(where);
  }
}
