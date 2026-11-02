import { IsInt, IsNotEmpty, Min, } from "class-validator";

export class CreateOrderItemDto{
    @IsNotEmpty({message:'book id tidak boleh kosong'})
    readonly bookId:string;

    @IsInt({message:'Quantity harus berupa angka'})
    @Min(1,{message:'Quantity minimal bernilai 1'})
    readonly quantity:number;
}