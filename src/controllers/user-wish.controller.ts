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
  User,
  Wish,
} from '../models';
import {UserRepository} from '../repositories';

export class UserWishController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/wishes', {
    responses: {
      '200': {
        description: 'Array of Wish\'s belonging to User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Wish)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Wish>,
  ): Promise<Wish[]> {
    return this.userRepository.wishes(id).find(filter);
  }

  @post('/users/{id}/wishes', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Wish)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.userid,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Wish, {
            title: 'NewWishInUser',
            exclude: ['id'],
            optional: ['userid']
          }),
        },
      },
    }) wish: Omit<Wish, 'id'>,
  ): Promise<Wish> {
    return this.userRepository.wishes(id).create(wish);
  }

  @patch('/users/{id}/wishes', {
    responses: {
      '200': {
        description: 'User.Wish PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Wish, {partial: true}),
        },
      },
    })
    wish: Partial<Wish>,
    @param.query.object('where', getWhereSchemaFor(Wish)) where?: Where<Wish>,
  ): Promise<Count> {
    return this.userRepository.wishes(id).patch(wish, where);
  }

  @del('/users/{id}/wishes', {
    responses: {
      '200': {
        description: 'User.Wish DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Wish)) where?: Where<Wish>,
  ): Promise<Count> {
    return this.userRepository.wishes(id).delete(where);
  }
}
