import { projectFirestore } from "@/firebase/config";
import { ref, watchEffect } from "@vue/runtime-core";

const getDocument = (collection, id) => {
    const error = ref(null);
    const document = ref(null);

    let documentRef = projectFirestore.collection(collection).doc(id);
    const unsubscribe = documentRef.onSnapshot((doc) => {
        if (doc.data()) {
            document.value = { ...doc.data(), id: doc.id };
            error.value = null;

        } else {
            error.value = `Category with the given ${id} doesn't exist!`;
            document.value = null;
        }
    }, (err) => {
        error.value = err.message;
        document.value = null;
    });

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsubscribe());
    });
    
    return { error, document };
};

export default getDocument;
