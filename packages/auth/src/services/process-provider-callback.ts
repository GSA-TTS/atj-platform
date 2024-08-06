import { OAuth2RequestError } from 'arctic';

import * as r from '@atj/common';
import { type AuthContext } from '..';
import { randomUUID } from 'crypto';

type LoginGovUser = {
  sub: string;
  iss: string;
  email: string;
  email_verified: boolean;
  ial: string;
  aal: string;
};

type Params = {
  code?: string | null;
  state?: string | null;
};

export const processProviderCallback = async (
  ctx: AuthContext,
  params: Params,
  storedParams: Params & { nonce: string | null },
  fetchUserData: typeof fetchUserDataImpl = fetchUserDataImpl
) => {
  if (
    !params.code ||
    !storedParams.state ||
    !storedParams.code ||
    params.state !== storedParams.state
  ) {
    return r.failure({ status: 400, message: 'bad request' });
  }

  const validateResult = await ctx.provider
    .validateAuthorizationCode(params.code, storedParams.code)
    .then(result => {
      return r.success(result);
    })
    .catch(error => {
      if (
        error instanceof OAuth2RequestError &&
        error.message === 'bad_verification_code'
      ) {
        return r.failure({ status: 400, message: 'bad verification code' });
      }
      return r.failure({
        status: 500,
        message: `unexpected error: ${error.message}`,
      });
    });

  if (validateResult.success === false) {
    return validateResult;
  }

  /**
   * {
      sub: '9bf734c4-54a4-4406-b2f1-4f0c46c2a4a6',
      iss: 'https://idp.int.identitysandbox.gov/',
      email: 'daniel.naab@gsa.gov',
      email_verified: true,
      ial: 'http://idmanagement.gov/ns/assurance/ial/1',
      aal: 'urn:gov:gsa:ac:classes:sp:PasswordProtectedTransport:duo',
      nonce: 'hardcoded-nonce-fixme-hardcoded-nonce-fixme-hardcoded-nonce-fixme',
      aud: 'urn:gov:gsa:openidconnect.profiles:sp:sso:gsa:tts-10x-atj-dev-server-doj',
      jti: 'aQ5X-RwN8taB4HOvDI5l_Q',
      at_hash: 'sr4z2Mu-fVcgECukwfLSFA',
      c_hash: 'dLhtGK59t3hplY-hFbiSuQ',
      acr: 'http://idmanagement.gov/ns/assurance/ial/1',
      exp: 1722461645,
      iat: 1722460745,
      nbf: 1722460745
    }
   */
  if (validateResult.data.decodedToken.nonce !== storedParams.nonce) {
    return r.failure({
      status: 403,
      message: 'nonce mismatch',
    });
  }

  const userDataResult = await fetchUserData(validateResult.data.accessToken);
  if (!userDataResult.success) {
    return userDataResult;
  }
  let userId = await ctx.db.getUserId(userDataResult.data.email);
  if (!userId) {
    const newUser = await ctx.db.createUser(userDataResult.data.email);
    if (!newUser) {
      return r.failure({ status: 500, message: 'error creating new user' });
    }
    userId = newUser.id;
  }
  const lucia = await ctx.getLucia();
  const session = await lucia.createSession(userId, {
    session_token: randomUUID(),
  });
  const sessionCookie = lucia.createSessionCookie(session.id);

  return r.success({
    email: userDataResult.data.email,
    sessionCookie,
  });
};

const fetchUserDataImpl = (accessToken: string) =>
  fetch('https://idp.int.identitysandbox.gov/api/openid_connect/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(response => response.json())
    .then((userData: LoginGovUser) => {
      if (userData.email_verified === false) {
        return r.failure({
          status: 403,
          message: 'email address not verified',
        });
      }
      return r.success(userData);
    })
    .catch(error =>
      r.failure({
        status: 500,
        message: `error fetching user data: ${error.message}`,
      })
    );
