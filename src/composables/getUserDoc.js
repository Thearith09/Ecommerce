import { projectFirestore } from "@/firebase/config";
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import getUser from "./getUser";

const { user } = getUser();



const getUserDoc = (collection) => {
    const error = ref(null);
    const _user = ref(null);
    if (user.value) {
        console.log(user.value);
        const documentRef = projectFirestore.collection(collection).doc(user.value.uid);

        const unsubscribe = documentRef.onSnapshot((doc) => {
            if (doc.data()) {
                _user.value = { ...doc.data() };
    
            } else {
                error.value = `User with the given ${user.value.id} doesn't exit!`;
                _user.value = null;
            }
    
        }, (err) => {
            error.value = err.message;
            _user.value = null;
        });
    
        watchEffect((onInvalidate) => {
            onInvalidate(() => unsubscribe());
        });
    }
    

    return { error, _user };
};

export default getUserDoc;