import {DefaultCrudRepository} from '@loopback/repository';
import {Wish, WishRelations} from '../models';
import {WishDatabasePostgresDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class WishRepository extends DefaultCrudRepository<
  Wish,
  typeof Wish.prototype.id,
  WishRelations
> {
  constructor(
    @inject('datasources.wishDatabasePostgres') dataSource: WishDatabasePostgresDataSource,
  ) {
    super(Wish, dataSource);
  }
}
