import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from "@loopback/repository";
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody
} from "@loopback/rest";
import { User } from "../models";
import { UserRepository } from "../repositories";

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository
  ) {}

  @post("/users", {
    responses: {
      "200": {
        description: "User model instance",
        content: { "application/json": { schema: getModelSchemaRef(User) } }
      }
    }
  })
  async create(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(User, {
            title: "NewUser",
            exclude: ["userid"]
          })
        }
      }
    })
    user: Omit<User, "userid">
  ): Promise<User> {
    return this.userRepository.create(user);
  }

  @get("/users/count", {
    responses: {
      "200": {
        description: "User model count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async count(
    @param.query.object("where", getWhereSchemaFor(User)) where?: Where<User>
  ): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get("/users", {
    responses: {
      "200": {
        description: "Array of User model instances",
        content: {
          "application/json": {
            schema: { type: "array", items: getModelSchemaRef(User) }
          }
        }
      }
    }
  })
  async find(
    @param.query.object("filter", getFilterSchemaFor(User))
    filter?: Filter<User>
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @patch("/users", {
    responses: {
      "200": {
        description: "User PATCH success count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async updateAll(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(User, { partial: true })
        }
      }
    })
    user: User,
    @param.query.object("where", getWhereSchemaFor(User)) where?: Where<User>
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @get("/users/{userid}", {
    responses: {
      "200": {
        description: "User model instance",
        content: { "application/json": { schema: getModelSchemaRef(User) } }
      }
    }
  })
  async findById(@param.path.number("userid") userid: number): Promise<User> {
    return this.userRepository.findById(userid);
  }

  @patch("/users/{userid}", {
    responses: {
      "204": {
        description: "User PATCH success"
      }
    }
  })
  async updateById(
    @param.path.number("userid") userid: number,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(User, { partial: true })
        }
      }
    })
    user: User
  ): Promise<void> {
    await this.userRepository.updateById(userid, user);
  }

  @put("/users/{userid}", {
    responses: {
      "204": {
        description: "User PUT success"
      }
    }
  })
  async replaceById(
    @param.path.number("userid") userid: number,
    @requestBody() user: User
  ): Promise<void> {
    await this.userRepository.replaceById(userid, user);
  }

  @del("/users/{userid}", {
    responses: {
      "204": {
        description: "User DELETE success"
      }
    }
  })
  async deleteById(@param.path.number("userid") userid: number): Promise<void> {
    await this.userRepository.deleteById(userid);
  }
}
