import { PartialType } from '@nestjs/mapped-types';

import { AcceptedDto } from './accepted.dto';

export class UpdateInviteDto extends PartialType(AcceptedDto) {}
