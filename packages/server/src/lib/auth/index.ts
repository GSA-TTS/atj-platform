import { OAuth2RequestError } from 'arctic';

import * as r from '@atj/common';
import { type DatabaseContext, getUserId, createUser } from '@atj/database';

import { type LoginGovUrl } from './login-gov';
import { loginGov } from './sessions';

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
  db: DatabaseContext,
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

  console.log(params.code);
  console.log(storedParams.code);
  const validateResult = await loginGov
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

  const userDataResult = await fetch(
    'https://idp.int.identitysandbox.gov/api/openid_connect/userinfo',
    {
      headers: {
        Authorization: `Bearer ${validateResult.data.accessToken}`,
      },
    }
  )
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

  if (!userDataResult.success) {
    return userDataResult;
  }

  /**
   * TODO: Fix up this logic to create a user in the database and create a session.
   */
  let userId = await getUserId(db, userDataResult.data.email);
  if (!userId) {
    const newUser = await createUser(db, userDataResult.data.email);
    if (!newUser) {
      return r.failure({ status: 500, message: 'error creating new user' });
    }
    userId = newUser.id;
  }
  const lucia = await db.getLucia();
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  return r.success({
    email: userDataResult.data.email,
    sessionCookie,
  });
};
