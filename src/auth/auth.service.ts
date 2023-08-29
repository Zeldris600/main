import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from 'src/dtos/register.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
       
        ) {

    }


    async registerUser(register: RegisterDto) {

        /* 
            1- Hash Incoming User password
            2- Save User Info to DB
            3- Serialize User password
            4- Implement Mechanisim from preventing attackers from brute-forcing this API to get a list of registered emails
        */

        const createHashForPassword = await bcrypt.hash(register.password, 10);
        try {

            const newUser2 = this.userService.addNewUser(
                {
                    ...register,
                    password: createHashForPassword
                }
            );


            (await newUser2).password = undefined // TODO Serialize password out of response object
            return newUser2
        } catch (error) {
            if (error?.code === PostgresErrorCode.uniqueViolation) {
                throw new HttpException('User with email already exists', HttpStatus.BAD_REQUEST)
            }

            throw new HttpException('Something Went Wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async login(email: string, unEncryptedPassword: string) {
        /* 
            1- Get User By Email
            2- Compare password using bcrypt.compare(): To achieve this a helper function was implemented to avoid throwing and catching the same error locally. Also, the error message is the same to prevent attacks that aim to get lists of registered emails in our DB
            4- Generate jwt token and return an object with a single access_token property
            3- Return appropriate response
        */

        try {
            const getUserInDB = await this.userService.getByEmail(email);
            await this.verifyPassword(unEncryptedPassword, getUserInDB.password);
            getUserInDB.password = undefined // TODO: Serialize user password out of response
            return getUserInDB
           /*  const payload = {...getUserInDB, sub: getUserInDB.id,}
            return {
                access_token: await this.jwtService.signAsync(payload)
            }; */

        } catch (error) {
            throw new UnauthorizedException;
        }




    }

    private async verifyPassword(unEncryptedPassword2: string, hashedPassword: string) {
        const isPasswordCorrect = await bcrypt.compare(unEncryptedPassword2, hashedPassword);

        if (!isPasswordCorrect) {
            throw new HttpException('Wrong Credntials', HttpStatus.BAD_REQUEST)
        }
    }


    pu
}
