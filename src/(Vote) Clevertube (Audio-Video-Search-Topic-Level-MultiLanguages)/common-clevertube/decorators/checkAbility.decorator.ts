import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../../casl/guard/firebase-auth.guard';
import { RequiredRule } from '../../casl/interfaces/requiredRule.interface';
import { ABILITY_METADATA_KEY } from '../constants/global.constant';

export const CheckAbility = (...requirements: RequiredRule[]) => {
  return applyDecorators(
    UseGuards(FirebaseAuthGuard),
    SetMetadata(ABILITY_METADATA_KEY, requirements),
    ApiBearerAuth(),
  );
};
