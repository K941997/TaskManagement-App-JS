/* eslint-disable prettier/prettier */
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/auth/entity/user.entity";
import { CategoryEntity } from "src/categories/entity/category.entity";
import { TaskEntity } from "src/tasks/entity/task.entity";
import { Action } from "./casl-action.enum";

type Subjects = InferSubjects<typeof TaskEntity | typeof CategoryEntity | typeof UserEntity> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserEntity) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.role === 'admin' || user.role === 'super_admin') {
      can(Action.Manage, 'all'); // read-write access to everything
      
      // cannot(Action.Manage, UserEntity, {orgId: {$ne: user.orgId}}) //!Admin chỉ đc manage user trong tổ chức của mình
      //   .because('You can only manage in ur own organization!')
    } else {
      can(Action.Read, 'all'); // read-only access to everything
    }

    
    can(Action.Update, TaskEntity, { authorId: user.id }); // only if they own it
    can(Action.Delete, TaskEntity, { authorId: user.id}); // only if they own it

    // can(Action.Update, TaskEntity, { author: {id: user.id} }); // only if they own it
    // can(Action.Delete, TaskEntity, { author: {id: user.id} }); // only if they own it

    can(Action.Update, UserEntity, {id: user.id}); // only if they own it
    can(Action.Delete, UserEntity, {id: user.id}); // only if they own it

    // cannot(Action.Delete, TaskEntity, { isPublished: true }); //không thể delete nếu đã xuất bán

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
