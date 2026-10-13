import { IsInt, IsNotEmpty } from "class-validator";

export class CreateBookDto{
    @IsNotEmpty({message: 'name harus diisi!'})
    readonly name:string;

    @IsNotEmpty({message:'Autho harus diisi!'})
    readonly author:string;

    @IsInt({message:'ISBN harus diisi!'})
    readonly isbn:string;

    @IsNotEmpty({message:"Publish year harus disisi!"})
    @IsInt({message:"Publih year harus berupa angka!"})
    readonly publishedYear:number;
}