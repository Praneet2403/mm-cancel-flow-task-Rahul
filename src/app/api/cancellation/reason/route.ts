import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { MOCK_USER_ID } from '@/lib/mockUser';

function isNonEmptyString(v: any): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

export async function POST(req: NextRequest) {
  try {
    const userId = MOCK_USER_ID;
    const body = await req.json().catch(() => ({}));
    const reason: string | undefined = body?.reason;
    const reason_detail: string | undefined = body?.reason_detail;
    const price_input_cents_raw = body?.price_input_cents;

    if (!isNonEmptyString(reason)) {
      return NextResponse.json({ error: 'reason is required' }, { status: 400 });
    }

    if (typeof reason_detail === 'string' && reason_detail.trim().length > 0) {
      if (reason_detail.trim().length < 25) {
        return NextResponse.json({ error: 'reason_detail must be at least 25 characters' }, { status: 400 });
      }
    }

    let price_input_cents: number | null = null;
    if (price_input_cents_raw !== undefined && price_input_cents_raw !== null) {
      const n = Number(price_input_cents_raw);
      if (!Number.isFinite(n) || n < 0 || n > 100000) {
        return NextResponse.json({ error: 'price_input_cents invalid' }, { status: 400 });
      }
      price_input_cents = Math.round(n);
    }

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
      .update({ reason, reason_detail, price_input_cents })
      .eq('id', cancellation.id);

    if (updErr) throw updErr;

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}
