import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { MOCK_USER_ID } from '@/lib/mockUser';

export async function POST(req: NextRequest) {
  try {
    const userId = MOCK_USER_ID;
    const body = await req.json().catch(() => ({}));
    const accepted = Boolean(body?.accepted);

    // Find in-progress cancellation
    const { data: cancellation, error: canErr } = await supabaseAdmin
      .from('cancellations')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'in_progress')
      .single();

    if (canErr || !cancellation) {
      return NextResponse.json({ error: 'No active cancellation' }, { status: 400 });
    }

    const { error: updErr } = await supabaseAdmin
      .from('cancellations')
      .update({ accepted_downsell: accepted })
      .eq('id', cancellation.id);

    if (updErr) throw updErr;

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}
