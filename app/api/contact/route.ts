import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      name, 
      email, 
      phone, 
      company, 
      requestType = 'quote',
      message,
      invoiceNumber,
      projectDetails,
      subscribeNewsletter = false,
    } = body

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields (name, email, message)' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const apiBaseUrl =
      process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'

    const upstream = await fetch(`${apiBaseUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        company,
        requestType,
        message,
        invoiceNumber,
        projectDetails,
        subscribeNewsletter,
      }),
    })

    const data = await upstream.json().catch(() => ({}))
    if (!upstream.ok) {
      return NextResponse.json({ error: data.message || data.error || 'Upstream error' }, { status: upstream.status })
    }

    return NextResponse.json(
      { 
        success: true,
        id: data.id,
        message: data.message || 'Your message has been received. We will get back to you soon.'
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Contact API error:', error)
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    )
  }
}
