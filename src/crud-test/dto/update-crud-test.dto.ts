import { PartialType } from '@nestjs/mapped-types';
import { CreateCrudTestDto } from './create-crud-test.dto';

export class UpdateCrudTestDto extends PartialType(CreateCrudTestDto) {}
