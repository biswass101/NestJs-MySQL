import { Injectable } from '@nestjs/common';
import { CreateCrudTestDto } from './dto/create-crud-test.dto';
import { UpdateCrudTestDto } from './dto/update-crud-test.dto';

@Injectable()
export class CrudTestService {
  create(createCrudTestDto: CreateCrudTestDto) {
    return 'This action adds a new crudTest';
  }

  findAll() {
    return `This action returns all crudTest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} crudTest`;
  }

  update(id: number, updateCrudTestDto: UpdateCrudTestDto) {
    return `This action updates a #${id} crudTest`;
  }

  remove(id: number) {
    return `This action removes a #${id} crudTest`;
  }
}
