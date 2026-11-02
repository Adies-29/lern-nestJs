import { IsNotEmpty } from "class-validator";

export class CreateCategoryeDto{
    @IsNotEmpty({message: 'name harus diisi!'})
    readonly name:string;
}