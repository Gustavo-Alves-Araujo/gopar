import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      company, responsible, country, email, phone,
      product, specification, quantity, destinationPort,
      incoterm, paymentTerms, observations,
    } = body

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { error } = await supabase.from('rfq_submissions').insert([{
      company,
      responsible,
      country,
      email,
      phone,
      product,
      specification: specification || null,
      quantity,
      destination_port: destinationPort || null,
      incoterm,
      payment_terms: paymentTerms,
      observations: observations || null,
      status: 'new',
    }])

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('RFQ error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Erro interno' },
      { status: 500 }
    )
  }
}
