import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { MOCK_USER_ID } from '@/lib/mockUser';

export async function GET(_req: NextRequest) {
  try {
    const userId = MOCK_USER_ID;

    const { data: sub, error: subErr } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (subErr || !sub) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    }

    const { data: cancellation } = await supabaseAdmin
      .from('cancellations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    return NextResponse.json({
      subscription: {
        id: sub.id,
        status: sub.status,
        cancel_at: sub.cancel_at,
        monthly_price: sub.monthly_price,
      },
      cancellation: cancellation
        ? {
            id: cancellation.id,
            status: cancellation.status,
            accepted_downsell: cancellation.accepted_downsell,
            downsell_variant: cancellation.downsell_variant,
          }
        : null,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}
