import * as r from '@atj/common';
import { OAuth2RequestError } from 'arctic';

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
    return r.success({ email: userData.email });
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
