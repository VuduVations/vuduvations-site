// src/app/api/contact/route.js
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, email, company, inquiryType, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Map inquiry types to readable labels
    const inquiryLabels = {
      general: 'General Inquiry',
      advisory: 'AI Strategy & Advisory',
      prototype: 'Rapid Prototyping',
      enterprise: 'Enterprise Solutions',
      partnership: 'Partnership Opportunities',
      technical: 'Technical Question'
    };

    const inquiryLabel = inquiryLabels[inquiryType] || 'General Inquiry';

    // Send notification email to you (VuduVations)
    const { data: notificationData, error: notificationError } = await resend.emails.send({
      from: 'VuduVations Contact <hello@vuduvations.io>',
      to: ['hello@vuduvations.io'], // Your email
      replyTo: email, // So you can reply directly to the sender
      subject: `New Contact: ${inquiryLabel} - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              
              <div style="background: #f3f4f6; padding: 15px; border-left: 4px solid #667eea; margin-bottom: 20px; border-radius: 4px;">
                <p style="margin: 0; color: #1f2937; font-weight: 600; font-size: 16px;">
                  ${inquiryLabel}
                </p>
              </div>

              <div style="margin-bottom: 20px;">
                <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: 600;">Name</p>
                <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 500;">${name}</p>
              </div>

              <div style="margin-bottom: 20px;">
                <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: 600;">Email</p>
                <p style="margin: 0;">
                  <a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-size: 16px;">${email}</a>
                </p>
              </div>

              ${company ? `
              <div style="margin-bottom: 20px;">
                <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: 600;">Company</p>
                <p style="margin: 0; color: #1f2937; font-size: 16px;">${company}</p>
              </div>
              ` : ''}

              <div style="margin-bottom: 20px;">
                <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: 600;">Message</p>
                <div style="background: #f9fafb; padding: 15px; border-radius: 6px; border: 1px solid #e5e7eb;">
                  <p style="margin: 0; color: #1f2937; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>
              </div>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; color: #6b7280; font-size: 12px;">
                  Submitted: ${new Date().toLocaleString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit',
                    timeZoneName: 'short'
                  })}
                </p>
              </div>

              <div style="margin-top: 20px; text-align: center;">
                <a href="mailto:${email}?subject=Re: ${inquiryLabel}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
                  Reply to ${name}
                </a>
              </div>
            </div>

            <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
              <p style="margin: 0;">VuduVations Contact Form</p>
              <p style="margin: 5px 0 0 0; font-style: italic;">Where Ideas Become Vectors</p>
            </div>
          </body>
        </html>
      `,
    });

    if (notificationError) {
      console.error('Resend notification error:', notificationError);
      return NextResponse.json(
        { error: 'Failed to send notification' },
        { status: 500 }
      );
    }

    // Send confirmation email to the user
    const { data: confirmationData, error: confirmationError } = await resend.emails.send({
      from: 'VuduVations <hello@vuduvations.io>',
      to: [email],
      subject: 'We received your message - VuduVations',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Thanks for reaching out!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Where Ideas Become Vectors</p>
            </div>
            
            <div style="background: #f9fafb; padding: 40px 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #1f2937; margin-top: 0;">Hi ${name},</h2>
              
              <p style="color: #4b5563; font-size: 16px;">
                We've received your message regarding <strong>${inquiryLabel}</strong> and we'll get back to you within 24 business hours.
              </p>

              <div style="background: white; border-left: 4px solid #667eea; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <p style="margin: 0; color: #1f2937; font-weight: 600;">Your message:</p>
                <p style="margin: 10px 0 0 0; color: #4b5563; white-space: pre-wrap; font-size: 14px;">${message}</p>
              </div>
              
              <div style="background: white; padding: 20px; margin: 30px 0; border-radius: 8px; border: 1px solid #e5e7eb;">
                <p style="margin: 0; color: #1f2937; font-weight: 600; margin-bottom: 15px;">While you wait, explore the VuduSuite:</p>
                <p style="margin: 0; color: #4b5563; font-size: 14px;">
                  <a href="https://vuduvations.io/ai-discovery" style="color: #667eea; text-decoration: none;">AI Discovery</a> • 
                  <a href="https://vuduvations.io/reflexion-itil" style="color: #667eea; text-decoration: none;">Reflexion ITIL</a> • 
                  <a href="https://vuduvations.io/consulting-analyzer" style="color: #667eea; text-decoration: none;">Sales Call Analyzer</a> • 
                  <a href="https://vuduvations.io/earnings-analyzer" style="color: #667eea; text-decoration: none;">Earnings Intelligence</a>
                </p>
              </div>
              
              <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                Best regards,<br>
                <strong style="color: #1f2937;">The VuduVations Team</strong><br>
                <a href="mailto:hello@vuduvations.io" style="color: #667eea; text-decoration: none;">hello@vuduvations.io</a>
              </p>
            </div>
            
            <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
              <p style="margin: 0;">© ${new Date().getFullYear()} VuduVations. Built by a one-person studio.</p>
              <p style="margin: 5px 0 0 0; font-style: italic;">Born of Vudu</p>
            </div>
          </body>
        </html>
      `,
    });

    if (confirmationError) {
      console.error('Resend confirmation error:', confirmationError);
      // Still return success since the main notification was sent
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully',
        notificationId: notificationData?.id,
        confirmationId: confirmationData?.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An error occurred while sending your message' },
      { status: 500 }
    );
  }
}
