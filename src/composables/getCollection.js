import { projectFirestore } from "@/firebase/config";
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";

const getCollection = (collection, limited) => {
    const error = ref(null);
    const documents = ref(null);
    let collectionRef;
    if (limited) {
        collectionRef = projectFirestore.collection(collection).orderBy("createdAt", "desc").limit(limited);
    } else {
        collectionRef = projectFirestore.collection(collection).orderBy("createdAt", "desc");
    }
    
    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
        const results = [];
        snapshot.docs.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id });
        });

        documents.value = results;
        error.value = null;

    }, (err) => {
        error.value = err.message;
    });

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsubscribe());
    });

    return { error, documents };
};

export default getCollection;