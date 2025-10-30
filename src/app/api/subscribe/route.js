// src/app/api/subscribe/route.js
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Send welcome email to subscriber
    const { data, error } = await resend.emails.send({
      from: 'VuduVations <hello@vuduvations.io>', // Replace with your verified domain
      to: [email],
      subject: 'Welcome to VuduVations Newsletter',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to VuduVations</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Where Ideas Become Vectors</p>
            </div>
            
            <div style="background: #f9fafb; padding: 40px 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #1f2937; margin-top: 0;">Thanks for subscribing!</h2>
              
              <p style="color: #4b5563; font-size: 16px;">
                You're now part of the VuduVations community. We'll keep you updated on:
              </p>
              
              <ul style="color: #4b5563; font-size: 16px; line-height: 1.8;">
                <li>New AI tool releases and updates</li>
                <li>Industry insights and best practices</li>
                <li>Exclusive early access to features</li>
                <li>AI innovation trends and analysis</li>
              </ul>
              
              <div style="background: white; border-left: 4px solid #667eea; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <p style="margin: 0; color: #1f2937; font-weight: 600;">Explore the VuduSuite:</p>
                <p style="margin: 10px 0 0 0; color: #4b5563; font-size: 14px;">
                  <a href="https://vuduvations.io/ai-discovery" style="color: #667eea; text-decoration: none;">AI Discovery</a> • 
                  <a href="https://vuduvations.io/reflexion-itil" style="color: #667eea; text-decoration: none;">Reflexion ITIL</a> • 
                  <a href="https://vuduvations.io/consulting-analyzer" style="color: #667eea; text-decoration: none;">Sales Call Analyzer</a> • 
                  <a href="https://vuduvations.io/earnings-analyzer" style="color: #667eea; text-decoration: none;">Earnings Intelligence</a>
                </p>
              </div>
              
              <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                Questions? Reply to this email or reach out at 
                <a href="mailto:hello@vuduvations.io" style="color: #667eea; text-decoration: none;">hello@vuduvations.io</a>
              </p>
            </div>
            
            <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
              <p style="margin: 0;">© ${new Date().getFullYear()} VuduVations</p>
              <p style="margin: 5px 0 0 0; font-style: italic;">Born of Vudu</p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Also send notification to yourself
    await resend.emails.send({
      from: 'VuduVations <hello@vuduvations.io>',
      to: ['hello@vuduvations.io'], // Your email to receive notifications
      subject: 'New Newsletter Subscriber',
      html: `
        <h2>New Subscriber</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subscribed:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed!',
        emailId: data?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
}
