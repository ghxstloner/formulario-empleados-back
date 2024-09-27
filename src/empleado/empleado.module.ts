import { Module } from "@nestjs/common";
import { EmpleadoController } from "./empleado.controller";
import { EmpleadoService } from "./empleado.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [PrismaModule], 
    controllers: [EmpleadoController],
    providers: [EmpleadoService],
    exports: [EmpleadoService]
})
export class EmpleadoModule {}
