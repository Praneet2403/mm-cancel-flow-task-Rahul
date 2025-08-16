import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { createHash } from 'crypto';
import { MOCK_USER_ID } from '@/lib/mockUser';

export async function POST(req: NextRequest) {
  try {
    const userId = MOCK_USER_ID;

    // Find active subscription
    const { data: sub, error: subErr } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (subErr || !sub) {
      return NextResponse.json({ error: 'No active subscription' }, { status: 400 });
    }

    // Check existing in-progress cancellation
    const { data: existing, error: existingErr } = await supabaseAdmin
      .from('cancellations')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'in_progress')
      .maybeSingle();

    if (existingErr) throw existingErr;

    let variant: 'A' | 'B';
    let cancellation = existing;

    if (!existing) {
      // Deterministic 50/50 based on userId hash (stable across sessions)
      const hash = createHash('sha256').update(userId).digest();
      variant = (hash[0] % 2 === 0) ? 'A' : 'B';
      const { data: inserted, error: insErr } = await supabaseAdmin
        .from('cancellations')
        .insert({ user_id: userId, subscription_id: sub.id, downsell_variant: variant })
        .select('*')
        .single();
      if (insErr) throw insErr;
      cancellation = inserted;

      // Mark subscription pending_cancellation
      const { error: updErr } = await supabaseAdmin
        .from('subscriptions')
        .update({ status: 'pending_cancellation' })
        .eq('id', sub.id);
      if (updErr) throw updErr;
    } else {
      variant = (existing as any).downsell_variant as 'A' | 'B';
    }

    return NextResponse.json({
      variant,
      monthly_price: sub.monthly_price,
      cancellation_id: cancellation?.id,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}
