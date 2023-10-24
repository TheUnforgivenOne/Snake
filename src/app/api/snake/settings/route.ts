import { SnakeBinds, Direction } from '@/snake/types';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

let binds: SnakeBinds = {
  [Direction.UP]: 'ArrowUp',
  [Direction.RIGHT]: 'ArrowRight',
  [Direction.DOWN]: 'ArrowDown',
  [Direction.LEFT]: 'ArrowLeft',
};

export const GET = async () => {
  const data = await Promise.resolve().then(() => binds);
  return Response.json({ data });
};

export const POST = async (req: Request) => {
  const body = await req.json();
  binds = body.binds;
  revalidatePath('/snake', 'layout');
  return Response.json({ status: 'ok' });
};
