import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateOrderDto{
    
    @IsNotEmpty({message: 'customerId tidak boleh kosong1'})
    readonly customerId:string;

    @IsNumber({}, {message: 'Total amount harus berupa angka'})
    @Min(0, {message: 'Total amount harus lebih besar dari 0'})
    @IsNotEmpty({message: 'Total amount tidak boleh kosong'})
    readonly totalAmount:number;
}