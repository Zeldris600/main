import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserdto } from 'src/dtos/createUser.dto';
import { log } from 'console';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ) { }


    async getAllUsers() {
        return this.userRepo.find()
    }

    async getByEmail(email: string) {
        const lookingForThisUser = await this.userRepo.findOne({ where: { email } });
        console.log(lookingForThisUser);

        if (lookingForThisUser) {
            return lookingForThisUser
        }

        throw new HttpException(`User with this email does not exist`, HttpStatus.NOT_FOUND)

    }

    async getById(id: number) {
        try {
            const lookingForUserWithId = await this.userRepo.findBy({ id });
            return lookingForUserWithId;
        } catch (error) {
            throw new HttpException(`User with id: ${id} Not Fund!`, HttpStatus.NOT_FOUND)
        }
    }

    async addNewUser(newUser: CreateUserdto) {

        try {
            const newUser2 = this.userRepo.create(newUser);
            await this.userRepo.save(newUser2);

            return newUser2

        } catch (error) {
            throw new HttpException('User Not Created', HttpStatus.NOT_IMPLEMENTED)
        }



    }

    async updateUserInfo(id: number, user: CreateUserdto) {
        await this.userRepo.update(id, user);

        const getUserToUpdateInfo = this.userRepo.findOne({ where: { id: id } });

        if (getUserToUpdateInfo) {
            return getUserToUpdateInfo
        };

        throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    async deleteUser(id: number) {
        const getThisUserToDelete = this.userRepo.delete(id);
        if (!(await getThisUserToDelete).affected) {
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
        }

        return { message: 'User Deleted' }
    }

}
