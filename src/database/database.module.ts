import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (ConfigService: ConfigService) => ({
            type: 'postgres',
            host: ConfigService.get('POSTGRES_HOST'),
            port: ConfigService.get('POSTGRES_PORT'),
            username: ConfigService.get('POSTGRES_USER'),
            password: ConfigService.get('POSTGRES_PASSWORD'),
            database: ConfigService.get('POSTGRES_DB'),
            entities: [User],
            synchronize: true,
            autoLoadEntities: true
        })
    })]
})
export class DatabaseModule {}
