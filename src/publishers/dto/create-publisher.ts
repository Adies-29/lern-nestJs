import { IsNotEmpty } from "class-validator";

export class CreatePublisherDto{
    @IsNotEmpty({message: 'name harus diisi!'})
    readonly name:string;
}