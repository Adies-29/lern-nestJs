import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface StandardResponse<T> {
  success: boolean;
  statusCode: number;
  data: T;
}


@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, StandardResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<StandardResponse<T>> {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse();
    const currentStatusCode = response.statusCode;

    // next.handle() menghasilkan nilai dari return controller
    return next.handle().pipe(
      map((originalData) => ({
        success: true,
        message:'Request berhasil',
        statusCode: currentStatusCode,
        // Jika controller me-return null/undefined, gantikan dengan null aman
        data: originalData ?? null,
      })),
    );
  }
}