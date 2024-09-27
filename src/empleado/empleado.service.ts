import { Injectable, NotFoundException, BadRequestException, ConflictException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma, Empleado } from "@prisma/client";

@Injectable()
export class EmpleadoService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Empleado[]> {
    try {
      return await this.prisma.empleado.findMany();
    } catch (error) {
      throw new BadRequestException('Error al obtener los empleados.');
    }
  }

  async findOne(id: string): Promise<Empleado | null> {
    const empleado = await this.prisma.empleado.findUnique({
      where: { id },
    });

    if (!empleado) {
      throw new NotFoundException(`Empleado con ID ${id} no encontrado.`);
    }
    
    return empleado;
  }

  async create(data: Prisma.EmpleadoCreateInput): Promise<Empleado> {
    try {
      return await this.prisma.empleado.create({
        data,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('El valor de "position" ya está en uso.');
      }
      throw new BadRequestException('Error al crear el empleado.');
    }
  }

  // Actualizar un empleado por su ID
  async update(id: string, data: Prisma.EmpleadoUpdateInput): Promise<Empleado> {
    try {
      // Verificar si el empleado existe antes de actualizar
      const empleado = await this.prisma.empleado.findUnique({ where: { id } });
      if (!empleado) {
        throw new NotFoundException(`Empleado con ID ${id} no encontrado.`);
      }

      return await this.prisma.empleado.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        // Prisma error code P2002 es para violación de la restricción de unicidad
        throw new ConflictException('El valor de "position" ya está en uso.');
      }
      throw new BadRequestException('Error al actualizar el empleado.');
    }
  }

  // Eliminar un empleado por su ID
  async delete(id: string): Promise<Empleado> {
    try {
      // Verificar si el empleado existe antes de eliminar
      const empleado = await this.prisma.empleado.findUnique({ where: { id } });
      if (!empleado) {
        throw new NotFoundException(`Empleado con ID ${id} no encontrado.`);
      }

      return await this.prisma.empleado.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException('Error al eliminar el empleado.');
    }
  }
}
