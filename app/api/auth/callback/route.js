import { NextResponse } from 'next/server';
import axios from 'axios';
import axiosInstance from '@/utils/axiosInstance';
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Missing code' }, { status: 400 });
  }

  try {
    const params = new URLSearchParams();
    params.append('client_id', process.env.MICROSOFT_CLIENT_ID);
    params.append('client_secret', process.env.MICROSOFT_CLIENT_SECRET);
    params.append('code', code);
    params.append('redirect_uri', process.env.MICROSOFT_REDIRECT_URI);
    params.append('grant_type', 'authorization_code');

    const tokenRes = await axios.post(
      'https://login.microsoftonline.com/common/oauth2/v2.0/token',
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
   
    
    const { access_token, refresh_token,expires_in } = tokenRes.data;
    const profileRes = await axios.get('https://graph.microsoft.com/v1.0/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
      const profile = profileRes.data;
      const{mail} = profile;

    const response = NextResponse.redirect(
  `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?email=${encodeURIComponent(mail)}&expires_in=${expires_in}`
);


    response.cookies.set('microsoft_access_token', access_token, {
 
      path: '/',
      maxAge: 60 * 60, // 1 hour
    });

    response.cookies.set('microsoft_refresh_token', refresh_token, {
     
   
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    response.cookies.set('ms_email',mail,{
    
        path: '/',
        maxAge: 30 * 24 * 60 * 60,
    })

    return response;
    // ✅ Redirect with tokens passed as query params
    
  } catch (error) {
    console.error('Token exchange failed:', error.message);
    return NextResponse.json(
      { error: 'Token exchange failed', details: error.message },
      { status: 500 }
    );
  }
}
