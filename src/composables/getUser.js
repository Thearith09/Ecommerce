import { projectAuth } from "@/firebase/config";
import { ref } from "@vue/reactivity";

const user = ref(null);

projectAuth.onAuthStateChanged(async (_user) => {
    if (_user) {
        const idTokenResult = await _user.getIdTokenResult();
        user.value = _user;
        user.value.admin = idTokenResult.claims.admin;
    } else {
        user.value = null;
    }
    
});

const getUser = () => {
    return { user };
};

export default getUser;