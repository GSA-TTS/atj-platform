export type SessionSchema = {
  id: string;
  user_id: string;
  session_token: string;
  expires_at: number;
  created_at: number;
  updated_at: number;
};
