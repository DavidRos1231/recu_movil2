//
// import {child, get, getDatabase, ref} from "firebase/database";
//
// const dbRef = ref(getDatabase());
// export async function getAll() {
//     try {
//         get(child(dbRef, `contactos/`)).then((snapshot) => {
//             return snapshot.val()
//         }).catch((error) => {
//             console.error(error);
//             throw new Error(error)
//         });
//     }catch (e) {
//         console.log(e);
//     }
// }

