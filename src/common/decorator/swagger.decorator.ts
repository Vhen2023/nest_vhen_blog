import { applyDecorators, Type } from '@nestjs/common';
import {
    ApiOperation,
    ApiOkResponse,
    ApiBadRequestResponse,
} from '@nestjs/swagger';

export function SwaggerDoc(
    summary: string,
    okDescription: string,
    badRequestDescription: string,
    type: Type,
) {
    return applyDecorators(
        ApiOperation({ summary }),
        ApiOkResponse({ description: okDescription, type }),
        ApiBadRequestResponse({ description: badRequestDescription }),
    );
}