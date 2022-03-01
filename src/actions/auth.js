import Swal from 'sweetalert2'
import { firebase, googleAuthProvider } from "../firabase/firebase-config";
import { types } from "../types/types";
import { noteLogout } from './notes';
import { finishLoading, removeError, setError, startLoading } from "./ui";

//el middleware va recibir una accion , aqui se regresa una  funcion
export const startLoginByEmailPassword = (email, password) => {
  return async (dispatch) => {
    dispatch(removeError());
    dispatch(startLoading());
   return  firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((err) => {
        dispatch(setError(err.message));
        dispatch(finishLoading());
        Swal.fire('ERROR',err.message, 'error');
      });
  };
};
export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then((userCredential) => {
        const { uid, displayName } = userCredential.user;
        dispatch(login(uid, displayName));
      });
  };
};

export const startRegisterWithEmailAndPassword = (email, password, name) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        console.log(user.uid, user.displayName);
        dispatch(login(user.uid, user.displayName));
      })
      .catch((error) => {
        Swal.fire('ERROR',error.message, 'error');

      });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const startLogout =  (email, password) => {
  return async (dispatch) => {
    await firebase.auth().signOut();

    dispatch(logout());
    dispatch(noteLogout());
  };
};

export const logout = () => ({ type: types.logout});
