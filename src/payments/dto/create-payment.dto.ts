import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from "class-validator";

export class CreatePatmentDto{
    @IsUUID('4', { message: 'Order ID harus berupa UUID valid!' })
    @IsNotEmpty({message:'Order ID harus diisi!'})
    readonly orderId:string;

    @IsString({message:'Paymen Method wajib berupa text'})
    @IsNotEmpty({message:'Payment Method harus diisi'})
    readonly paymentMethod:string;


    @IsNumber({},{message:'amount harus berupa angka'})
    @IsNotEmpty({message:'amount harus diisi'})
    @Min(0,{message:'amout tidak boleh kurang dari 0'})
    readonly amount:number;


}