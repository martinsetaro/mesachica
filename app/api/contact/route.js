import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { fullName, email, company, role, country, service, needDescription, phone, website } =
      await request.json();

    // Honeypot: si viene completo, es un bot. Respondemos ok sin enviar el email.
    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!fullName || !email || !company || !role || !country || !service || !needDescription) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true, // true para puerto 465, false para 587
      auth: {
        user: process.env.EMAIL_USER, // contacto@mesachica.tech
        pass: process.env.EMAIL_PASS, // contraseña de esa casilla
      },
    });

    await transporter.sendMail({
      from: `"Solicitudes web" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO, // contacto@mesachica.tech
      replyTo: email,
      subject: `Nueva consulta — ${company}`,
      html: `
        <h2>Nueva solicitud de consulta</h2>
        <p><strong>Nombre y apellido:</strong> ${fullName}</p>
        <p><strong>Correo corporativo:</strong> ${email}</p>
        <p><strong>Empresa:</strong> ${company}</p>
        <p><strong>Cargo o posición:</strong> ${role}</p>
        <p><strong>País:</strong> ${country}</p>
        <p><strong>Servicio de interés:</strong> ${service}</p>
        <p><strong>Descripción de la necesidad:</strong> ${needDescription}</p>
        <p><strong>Teléfono o WhatsApp:</strong> ${phone || 'No informado'}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Error enviando email:', err);
    return NextResponse.json({ error: 'No se pudo enviar el mensaje' }, { status: 500 });
  }
}