import { DefaultCrudRepository, repository, HasManyRepositoryFactory} from "@loopback/repository";
import { User, UserRelations, Wish} from "../models";
import { WishDatabasePostgresDataSource } from "../datasources";
import { inject, Getter} from "@loopback/core";
import {WishRepository} from './wish.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.userid,
  UserRelations
> {

  public readonly wishes: HasManyRepositoryFactory<Wish, typeof User.prototype.userid>;

  constructor(
    @inject("datasources.wishDatabasePostgres")
    dataSource: WishDatabasePostgresDataSource, @repository.getter('WishRepository') protected wishRepositoryGetter: Getter<WishRepository>,
  ) {
    super(User, dataSource);
    this.wishes = this.createHasManyRepositoryFactoryFor('wishes', wishRepositoryGetter,);
    this.registerInclusionResolver('wishes', this.wishes.inclusionResolver);
  }
}
