import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateShipmentsDto{
    @IsUUID('4', { message: 'Order ID harus berupa UUID valid!' })
    @IsNotEmpty({message:'Order ID harus diisi'})
    readonly orderId:string;

    @IsString({ message: 'Nama kurir harus berupa teks!' })
    @IsNotEmpty({ message: 'Nama kurir tidak boleh kosong!' })
    courier: string;
}