import { Exclude } from "class-transformer";

export class UserEntity {
    id: number;
    name: string;
    email: string;
    created_at : Date;
    

    @Exclude()
    password: string;

    @Exclude()
    token: string;

    //auto fill
    constructor(partial: Partial<UserEntity>){
        Object.assign(this, partial);
    }

}