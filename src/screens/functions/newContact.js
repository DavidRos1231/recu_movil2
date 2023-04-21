/*import {child, get, getDatabase, ref, set} from "firebase/database";

const dbRef = ref(getDatabase());
export *//*async function writeUserData(nombre, telefono, colonia, calle, cp) {
    try {

        let numId = 1;
        get(child(dbRef, `contactos/`)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                // Obtener el número de elementos en el objeto
                const conteo = Object.keys(data).length;
                numId = conteo + 1;
                const db = getDatabase();
                set(ref(db, 'contactos/' + numId), {
                    id: numId,
                    nombre: nombre,
                    telefono: telefono,
                    colonia: colonia,
                    calle: calle,
                    cp: cp,

                });
            } else {
                numId = 1;
                const db = getDatabase();
                set(ref(db, 'lugares/' + numId), {
                    id: numId,
                    nombre: nombre,
                    telefono: telefono,
                    colonia: colonia,
                    calle:calle,
                    cp: cp,
                });
            }
        }).catch((error) => {
            console.error(error);
        });
    }catch (e) {
        console.log(e);
    }
}*/