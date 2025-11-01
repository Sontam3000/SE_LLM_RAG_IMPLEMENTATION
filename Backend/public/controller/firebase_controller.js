import { 
    getFirestore,
    collection,
    addDoc,
    query,
    getDoc,
    getDocs,
    orderBy,
    where,
    updateDoc,
    doc,
    deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";


import {app} from './firebase_core.js';
const db = getFirestore(app);
const COLLECTION_PAYLOAD = "payload";
const COLLECTION_CONTEXT = "context";
// export async function addInfo(load){
//     const collRef = collection(db,COLLECTION_PAYLOAD);
//     const docRef = await addDoc(collRef,load);
//     return docRef.id;
// }

export async function getinfo() {
    const docRef = doc(db, COLLECTION_PAYLOAD, '60Dhjo8HxGd5cOIdJTlO');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document!");
        return null;
    }
}

export async function onUpdatePayload(update){
    const collRef = collection(db, COLLECTION_PAYLOAD);
        const docRef = doc(collRef, '60Dhjo8HxGd5cOIdJTlO');
        await updateDoc(docRef, update);
        console.log(update);
}

export async function LoadContext(course){
    const collRef = collection(db, COLLECTION_CONTEXT);
    const q = query(collRef,
        where('course', '==' , course )
    );
    const snapshot = await getDocs(q);
    const datadoc = snapshot.docs[0].data(); 
    return datadoc.context;

}