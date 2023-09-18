// Guessing at the types here, based on the JSON returned by the API.
export type DocassembleInterview = {
  email: string;
  filename: string;
  metadata: {
    _origin_package: string;
    _origin_path: string;
    title: string;
  };
  modtime: string;
  session: string;
  starttime: string;
  subtitle: string | null;
  tags: string[];
  temp_user_id: string | null;
  title: string;
  user_id: number;
  utc_modtime: string;
  utc_starttime: string | null;
  valid: boolean;
};
