import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Trackgenre} from '../models';
import {TrackgenreRepository} from '../repositories';

export class TrackgenreController {
  constructor(
    @repository(TrackgenreRepository)
    public trackgenreRepository: TrackgenreRepository,
  ) { }

  @post('/trackgenre')
  @response(200, {
    description: 'Trackgenre model instance',
    content: {'application/json': {schema: getModelSchemaRef(Trackgenre)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Trackgenre, {
            title: 'NewTrackgenre',

          }),
        },
      },
    })
    trackgenre: Trackgenre,
  ): Promise<Trackgenre> {
    return this.trackgenreRepository.create(trackgenre);
  }

  @get('/trackgenre/count')
  @response(200, {
    description: 'Trackgenre model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Trackgenre) where?: Where<Trackgenre>,
  ): Promise<Count> {
    return this.trackgenreRepository.count(where);
  }

  @get('/trackgenre')
  @response(200, {
    description: 'Array of Trackgenre model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Trackgenre, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Trackgenre) filter?: Filter<Trackgenre>,
  ): Promise<Trackgenre[]> {
    return this.trackgenreRepository.find(filter);
  }

  @patch('/trackgenre')
  @response(200, {
    description: 'Trackgenre PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Trackgenre, {partial: true}),
        },
      },
    })
    trackgenre: Trackgenre,
    @param.where(Trackgenre) where?: Where<Trackgenre>,
  ): Promise<Count> {
    return this.trackgenreRepository.updateAll(trackgenre, where);
  }

  @get('/trackgenre/{id}')
  @response(200, {
    description: 'Trackgenre model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Trackgenre, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Trackgenre, {exclude: 'where'}) filter?: FilterExcludingWhere<Trackgenre>
  ): Promise<Trackgenre> {
    return this.trackgenreRepository.findById(id, filter);
  }

  @patch('/trackgenre/{id}')
  @response(204, {
    description: 'Trackgenre PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Trackgenre, {partial: true}),
        },
      },
    })
    trackgenre: Trackgenre,
  ): Promise<void> {
    await this.trackgenreRepository.updateById(id, trackgenre);
  }

  @put('/trackgenre/{id}')
  @response(204, {
    description: 'Trackgenre PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() trackgenre: Trackgenre,
  ): Promise<void> {
    await this.trackgenreRepository.replaceById(id, trackgenre);
  }

  @del('/trackgenre/{id}')
  @response(204, {
    description: 'Trackgenre DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.trackgenreRepository.deleteById(id);
  }
}
