import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref(null);

const googleLogin = async (provider) => {
  error.value = null;

  try {
    const result = await projectAuth.signInWithPopup(provider);
    const credential = result.credential;
    const user = result.user;
    const accessToken = credential.accessToken;
    console.log(user);
    console.log(result);
    return { user, accessToken };
  } catch (err) {
    error.value = err.message;
  }
};

const useGoogleLogin = () => {
  return { error, googleLogin };
};

export default useGoogleLogin;
