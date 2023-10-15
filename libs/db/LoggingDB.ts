import admin from 'firebase-admin';
import type {
  CollectionReference,
  Firestore,
  WriteResult,
} from 'firebase-admin/firestore';
import type { DecodedIdToken } from 'firebase-admin/auth';
import ILoggingDB from '../../interfaces/ILoggingDB';
import type { LoggingData } from '../../types/types';
class LoggingDB implements ILoggingDB {
  private db: Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  // private initializeFirebase(): App {
  //   try {
  //     return admin.initializeApp({
  //       credential: admin.credential.cert(firebaseConfig as ServiceAccount),
  //     });
  //   } catch (e: any) {
  //     throw new Error(e);
  //   }
  // }

  public async set(data: LoggingData): Promise<WriteResult> {
    try {
      const collectionRef: CollectionReference = this.db.collection('logs');
      return await collectionRef.doc().set(data);
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async getByID(id: string): Promise<LoggingData | null> {
    try {
      const collectionRef: CollectionReference = this.db.collection('logs');
      const docRef = await collectionRef.doc(id).get();
      if (docRef.exists) {
        return docRef.data() as LoggingData;
      }
      return null;
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async update(
    logReference: string,
    data: Partial<LoggingData>
  ): Promise<WriteResult> {
    try {
      const collectionRef: CollectionReference = this.db.collection('logs');
      return await collectionRef.doc(logReference).update(data);
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async deleteByID(id: string): Promise<Boolean> {
    try {
      const collectionRef: CollectionReference = this.db.collection('logs');
      return !!(await collectionRef.doc(id).delete());
    } catch (e: any) {
      throw new Error(e);
    }
  }

  public async verifyJWT(token: string): Promise<DecodedIdToken> {
    try {
      return await admin.auth().verifyIdToken(token);
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export default LoggingDB;
