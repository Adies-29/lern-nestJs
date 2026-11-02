import { IsNotEmpty } from "class-validator";

export class CreateAuthorDto{
    @IsNotEmpty({message: 'name harus diisi!'})
    readonly name:string;
}