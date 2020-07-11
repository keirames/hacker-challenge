import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userExternalLoginSchema } from './schemas/userExternalLogin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserExternalLoginsModule.name, schema: userExternalLoginSchema },
    ]),
  ],
})
export class UserExternalLoginsModule {}
