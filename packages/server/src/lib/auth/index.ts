import * as r from '@atj/common';
import { type DatabaseClient, getUserId } from '@atj/database';
import { OAuth2RequestError } from 'arctic';

import { type LoginGovUrl } from './login-gov';
import { loginGov, lucia } from './sessions';

type LoginGovUser = {
  sub: string;
  iss: LoginGovUrl;
  email: string;
  email_verified: boolean;
  ial: string;
  aal: string;
};

type Params = {
  code: string | null;
  state: string | null;
};

export const processLoginGovCallback = async (
  db: DatabaseClient,
  params: Params,
  storedParams: Params
) => {
  if (
    !params.code ||
    !storedParams.state ||
    !storedParams.code ||
    params.state !== storedParams.state
  ) {
    return r.failure({ status: 400, message: 'bad request' });
  }

  try {
    const tokens = await loginGov.validateAuthorizationCode(
      params.code,
      storedParams.code
    );
    const loginGovUserResponse = await fetch(
      'https://idp.int.identitysandbox.gov/api/openid_connect/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
    const userData = (await loginGovUserResponse.json()) as LoginGovUser;
    if (userData.email_verified === false) {
      return r.failure({ status: 403, message: 'email address not verified' });
    }

    /**
     * TODO: Fix up this logic to create a user in the database and create a session.
     */
    console.log('trying ');
    let userId = await getUserId(db, userData.email);
    console.log('done', userId);
    if (!userId) {
      userId = await createUser(userData.email);
    }
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    return r.success({ email: userData.email, sessionCookie });
  } catch (e) {
    if (
      e instanceof OAuth2RequestError &&
      e.message === 'bad_verification_code'
    ) {
      return r.failure({ status: 400, message: 'bad verification code' });
    }
    return r.failure({ status: 500, message: 'unexpected error' });
  }
};
