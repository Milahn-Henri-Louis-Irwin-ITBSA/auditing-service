import type { Timestamp } from 'firebase-admin/firestore';
import type { UserInfo } from 'firebase-admin/auth';
export type LoggingData = {
  created_at: Timestamp;
  type: string;
  written_by: string;
  message: string;
  user_uid: UserInfo;
  response_code: number;
};
