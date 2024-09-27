import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { EmpleadoService } from "./empleado.service";
import { Empleado } from "@prisma/client";

@Controller('empleados')
export class EmpleadoController {
  constructor(private readonly empleadoService: EmpleadoService) {}

  // Obtener todos los empleados
  @Get()
  findAll(): Promise<Empleado[]> {
    return this.empleadoService.findAll();
  }

  // Obtener un empleado por su ID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Empleado | null> {
    return this.empleadoService.findOne(id);
  }

  // Crear un nuevo empleado
  @Post()
  create(@Body() data: Empleado): Promise<Empleado> {
    return this.empleadoService.create(data);
  }

  // Actualizar un empleado por su ID
  @Put(':id')
  update(@Param('id') id: string, @Body() data: Empleado): Promise<Empleado> {
    return this.empleadoService.update(id, data);
  }

  // Eliminar un empleado por su ID
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Empleado> {
    return this.empleadoService.delete(id);
  }
}
