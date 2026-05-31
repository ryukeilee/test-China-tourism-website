import { Module } from "@nestjs/common";
import { ScenicController } from "./scenic.controller";
import { ScenicService } from "./scenic.service";

@Module({
  controllers: [ScenicController],
  providers: [ScenicService],
  exports: [ScenicService],
})
export class ScenicModule {}
