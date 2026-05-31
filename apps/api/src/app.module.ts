import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import configuration from "./config/configuration";
import { PrismaModule } from "./prisma/prisma.module";
import { AiModule } from "./modules/ai/ai.module";
import { ScenicModule } from "./modules/scenic/scenic.module";
import { HotelModule } from "./modules/hotel/hotel.module";
import { FlightModule } from "./modules/flight/flight.module";
import { TrainModule } from "./modules/train/train.module";
import { CarRentalModule } from "./modules/car-rental/car-rental.module";
import { WeatherModule } from "./modules/weather/weather.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration], envFilePath: [".env", ".env.local"] }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    PrismaModule,
    AiModule,
    ScenicModule,
    HotelModule,
    FlightModule,
    TrainModule,
    CarRentalModule,
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
