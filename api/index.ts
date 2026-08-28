import { app } from '../src/serverApp.js';

export default function handler(req: any, res: any) {
  return app(req, res);
}
