import { projectAuth } from "@/firebase/config";
import { ref } from "@vue/reactivity";

const error = ref(null);
const isPending = ref(false);

const resetPassword = async (email) => {
    error.value = null;
    isPending.value = true;
    
    try {
        const res = await projectAuth.sendPasswordResetEmail(email);
        isPending.value = false;

        return res;
    } catch (err) {
        error.value = err.message;
        isPending.value = false;

    }
};

const useResetPassword = () => {
    return { error, resetPassword, isPending };
};

export default useResetPassword;