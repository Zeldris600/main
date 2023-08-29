import {  Controller, Get, Post, Param, Body, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserdto } from 'src/dtos/createUser.dto';

@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UsersService
    ) {}

    // Todo: Protect this route
    @Get()
    async listUsers(){
        return this.userService.getAllUsers();
    };

    @Get(':id')
    async getById(@Param('id', ParseIntPipe)  id: number) {
        return this.userService.getById(id);
    }

    @Get('sign-in')
    async login(@Body() email: any) {
    console.log(email);
        
        return this.userService.getByEmail(email.email);
    };

    @Post()
    async createUser(@Body() user: CreateUserdto) {
        return this.userService.addNewUser(user);


    
    };


    @Put(':id')
    async updateUserInfo(@Param('id', ParseIntPipe) id: number , @Body() user: CreateUserdto) {
        return this.userService.updateUserInfo(id,  user)
    }

    @Delete(':id')
    async removeAUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
    };
}
