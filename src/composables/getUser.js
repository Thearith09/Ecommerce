import { projectAuth } from "@/firebase/config";
import { ref } from "@vue/reactivity";

const user = ref(null);

projectAuth.onAuthStateChanged(async (_user) => {
    if (_user) {
        const idTokenResult = await _user.getIdTokenResult();
        user.value = _user;
        console.log(idTokenResult.claims)
        if (idTokenResult.claims.admin)
            user.value.admin = idTokenResult.claims.admin;
        if (idTokenResult.claims.packer)
            user.value.packer = idTokenResult.claims.packer;
        if (idTokenResult.claims.delivery)
            user.value.delivery = idTokenResult.claims.delivery;
    } else {
        user.value = null;
    }
    
});

const getUser = () => {
    return { user };
};

export default getUser;