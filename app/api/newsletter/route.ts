import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validation
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const apiBaseUrl =
      process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'

    const upstream = await fetch(`${apiBaseUrl}/api/content/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const data = await upstream.json().catch(() => ({}))
    if (!upstream.ok) {
      return NextResponse.json({ error: data.message || data.error || 'Upstream error' }, { status: upstream.status })
    }

    return NextResponse.json(
      { 
        success: true,
        message: data.message || 'Successfully subscribed to our newsletter!'
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Newsletter API error:', error)
    return NextResponse.json(
      { error: 'Failed to process newsletter subscription' },
      { status: 500 }
    )
  }
}
