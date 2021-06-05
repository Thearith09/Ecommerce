import { projectFirestore } from "@/firebase/config";
import { ref, watchEffect } from "@vue/runtime-core";

const getDocument = (collection, id, subCollection) => {
    const error = ref(null);
    const documents = ref(null);

    const subCollectionRef = projectFirestore.collection(collection).doc(id).collection(subCollection);
    const unsubscribe = subCollectionRef.onSnapshot((snapshot) => {
        const results = [];
        snapshot.docs.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id });
        });

        documents.value = results;
        error.value = null;
    }, (err) => {
        error.value = err.message;
        documents.value = null;
    });

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsubscribe());
    });
    
    return { error, documents };
};

export default getDocument;
