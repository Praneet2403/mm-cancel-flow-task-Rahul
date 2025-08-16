import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { MOCK_USER_ID } from '@/lib/mockUser';

export async function POST(_req: NextRequest) {
  try {
    const userId = MOCK_USER_ID;

    // Get in-progress cancellation and subscription
    const { data: cancellation, error: canErr } = await supabaseAdmin
      .from('cancellations')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'in_progress')
      .single();

    if (canErr || !cancellation) {
      return NextResponse.json({ error: 'No active cancellation' }, { status: 400 });
    }

    const { data: sub, error: subErr } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('id', cancellation.subscription_id)
      .single();

    if (subErr || !sub) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 400 });
    }

    // For demo, set cancel_at to 30 days from now
    const cancelAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    const { error: subUpdErr } = await supabaseAdmin
      .from('subscriptions')
      .update({ status: 'cancelled', cancel_at: cancelAt })
      .eq('id', sub.id);
    if (subUpdErr) throw subUpdErr;

    const { error: canUpdErr } = await supabaseAdmin
      .from('cancellations')
      .update({ status: 'completed' })
      .eq('id', cancellation.id);
    if (canUpdErr) throw canUpdErr;

    return NextResponse.json({ ok: true, cancel_at: cancelAt });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}
