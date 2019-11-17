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
import { Wish } from "../models";
import { WishRepository } from "../repositories";

export class WishController {
  constructor(
    @repository(WishRepository)
    public wishRepository: WishRepository
  ) {}

  @post("/wishes", {
    responses: {
      "200": {
        description: "Wish model instance",
        content: { "application/json": { schema: getModelSchemaRef(Wish) } }
      }
    }
  })
  async create(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Wish, {
            title: "NewWish",
            exclude: ["id"]
          })
        }
      }
    })
    wish: Omit<Wish, "id">
  ): Promise<Wish> {
    return this.wishRepository.create(wish);
  }

  @get("/wishes/count", {
    responses: {
      "200": {
        description: "Wish model count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async count(
    @param.query.object("where", getWhereSchemaFor(Wish)) where?: Where<Wish>
  ): Promise<Count> {
    return this.wishRepository.count(where);
  }

  @get("/wishes", {
    responses: {
      "200": {
        description: "Array of Wish model instances",
        content: {
          "application/json": {
            schema: { type: "array", items: getModelSchemaRef(Wish) }
          }
        }
      }
    }
  })
  async find(
    @param.query.object("filter", getFilterSchemaFor(Wish))
    filter?: Filter<Wish>
  ): Promise<Wish[]> {
    return this.wishRepository.find(filter);
  }

  @patch("/wishes", {
    responses: {
      "200": {
        description: "Wish PATCH success count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async updateAll(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Wish, { partial: true })
        }
      }
    })
    wish: Wish,
    @param.query.object("where", getWhereSchemaFor(Wish)) where?: Where<Wish>
  ): Promise<Count> {
    return this.wishRepository.updateAll(wish, where);
  }

  @get("/wishes/{id}", {
    responses: {
      "200": {
        description: "Wish model instance",
        content: { "application/json": { schema: getModelSchemaRef(Wish) } }
      }
    }
  })
  async findById(@param.path.number("id") id: number): Promise<Wish> {
    return this.wishRepository.findById(id);
  }

  @patch("/wishes/{id}", {
    responses: {
      "204": {
        description: "Wish PATCH success"
      }
    }
  })
  async updateById(
    @param.path.number("id") id: number,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Wish, { partial: true })
        }
      }
    })
    wish: Wish
  ): Promise<void> {
    await this.wishRepository.updateById(id, wish);
  }

  @put("/wishes/{id}", {
    responses: {
      "204": {
        description: "Wish PUT success"
      }
    }
  })
  async replaceById(
    @param.path.number("id") id: number,
    @requestBody() wish: Wish
  ): Promise<void> {
    await this.wishRepository.replaceById(id, wish);
  }

  @del("/wishes/{id}", {
    responses: {
      "204": {
        description: "Wish DELETE success"
      }
    }
  })
  async deleteById(@param.path.number("id") id: number): Promise<void> {
    await this.wishRepository.deleteById(id);
  }
}
