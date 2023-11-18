import {
  CollectionReference,
  Firestore,
  Timestamp,
} from 'firebase-admin/firestore';
import admin from 'firebase-admin';
export default class ListenDB {
  private db: Firestore;
  constructor() {
    this.db = admin.firestore();
  }
  public listenToCollection(
    collection: CollectionReference,
    callback: Function
  ) {
    collection.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          callback(change.doc.data());
        }
      });
    });
  }

  public startListen() {
    const collectionFeedRef = this.db.collection('feed');
    const collectionMapRef = this.db.collection('map');

    collectionFeedRef.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          this.db
            .collection('feed')
            .doc(change.doc.id)
            .get()
            .then((doc) => {
              if (doc.exists) {
                const data = doc.data();
                if (data) {
                  this.db.collection('logs').doc().set({
                    type: 'feed',
                    data: data,
                    timestamp: Timestamp.now(),
                  });
                }
              }
            });
        }
      });
    });

    collectionMapRef.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          this.db
            .collection('map')
            .doc(change.doc.id)
            .get()
            .then((doc) => {
              if (doc.exists) {
                const data = doc.data();
                if (data) {
                  this.db.collection('logs').doc().set({
                    type: 'map',
                    data: data,
                    timestamp: Timestamp.now(),
                  });
                }
              }
            });
        }
      });
    });
  }
}
