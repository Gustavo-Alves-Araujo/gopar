import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // Placeholder - configure your email provider here (e.g. Nodemailer, Resend, SendGrid)
    console.log('Email request received:', body)
    return NextResponse.json({ success: true, message: 'Mensagem recebida!' })
  } catch (error) {
    console.error('Error processing email request:', error)
    return NextResponse.json(
      { success: false, message: 'Erro ao processar requisição' },
      { status: 500 }
    )
  }
}
