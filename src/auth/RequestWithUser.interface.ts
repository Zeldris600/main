import { Request } from "express";
import { User } from "src/entities/user.entity";


interface RequestObjWithUser extends Request {
    user: User
}

export default RequestObjWithUser