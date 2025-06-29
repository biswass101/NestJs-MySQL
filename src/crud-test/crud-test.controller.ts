import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CrudTestService } from './crud-test.service';
import { CreateCrudTestDto } from './dto/create-crud-test.dto';
import { UpdateCrudTestDto } from './dto/update-crud-test.dto';

@Controller('crud-test')
export class CrudTestController {
  constructor(private readonly crudTestService: CrudTestService) {}

  @Post()
  create(@Body() createCrudTestDto: CreateCrudTestDto) {
    return this.crudTestService.create(createCrudTestDto);
  }

  @Get()
  findAll() {
    return this.crudTestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crudTestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCrudTestDto: UpdateCrudTestDto) {
    return this.crudTestService.update(+id, updateCrudTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crudTestService.remove(+id);
  }
}
