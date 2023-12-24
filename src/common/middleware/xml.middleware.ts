import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';

const bodyParserMiddleware = bodyParser.text({
    limit: '1024kb',
    type: 'application/xml',
});

@Injectable()
export class XMLMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.headers['content-type'] && req.headers['content-type'].includes('application/xml')) {
            bodyParserMiddleware(req, res, next);
        } else {
            next()
        }
    }

}