import type { LoggingData } from '../types/types';
import type { WriteResult } from 'firebase-admin/firestore';
abstract class ILoggingDB {
  abstract set(data: LoggingData): Promise<WriteResult>;
  abstract getByID(id: string): Promise<LoggingData | null>;
  abstract update(
    logReference: string,
    data: Partial<LoggingData>
  ): Promise<WriteResult>;
  abstract deleteByID(id: string): Promise<Boolean>;
}
export default ILoggingDB;
