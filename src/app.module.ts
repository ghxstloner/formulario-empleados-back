import { Module } from '@nestjs/common';
import { EmpleadoModule } from './empleado/empleado.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [EmpleadoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })],
  controllers: [],
  providers: [],
})
export class AppModule { }
