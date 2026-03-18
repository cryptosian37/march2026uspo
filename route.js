import { NextResponse } from 'next/server';

let supabaseAdmin = null;

function getSupabaseAdmin() {
  if (supabaseAdmin) return supabaseAdmin;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || url.includes('your_supabase') || !key || key.includes('your_supabase')) {
    return null;
  }
  const { createClient } = require('@supabase/supabase-js');
  supabaseAdmin = createClient(url, key);
  return supabaseAdmin;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const client = getSupabaseAdmin();
    if (client) {
      await client.from('ppc_discovery_sessions').insert([{
        firm_name: body.sessionData?.firmName,
        contact_name: body.sessionData?.contactName,
        agent_name: body.sessionData?.agentName,
        answers: body.answers,
        scores: body.scores,
        total_score: body.totalScore,
        score_pct: body.pct,
        qualification: body.qualification,
        session_date: body.sessionData?.sessionDate,
      }]);
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Submit error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}