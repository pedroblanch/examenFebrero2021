import {Injectable} from '@angular/core';
import { InterfaceProvider } from 'src/app/modelo/interfaceProvider';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Alumno } from 'src/app/modelo/alumno';

@Injectable()
export class ApiServiceProvider implements InterfaceProvider{
    
    constructor(private angularFirestore: AngularFirestore){
    }


getAlumnos():Observable<any> {
   //al llamar al método snapshotChanges se nos devuelve un observable
    //si nos subscribimos al observable nos saltará el evento cuando halla algún cambio en los 
    //datos que produce el observable
    return this.angularFirestore.collection("alumnos").snapshotChanges();
}

eliminarAlumno(id:number):Promise<void>{
    return this.angularFirestore.collection("alumnos").doc(""+id).delete();
}//end_eliminar_alumno

modificarAlumno(idAlumno:number, nuevosDatosAlumno:Alumno):Promise<void>{
    let nuevosDatosAlumnoJson=nuevosDatosAlumno.getJsonObject();
    delete nuevosDatosAlumno.id;
    return this.angularFirestore.collection("alumnos").doc(""+idAlumno).set(nuevosDatosAlumnoJson);
}//end_modificarAlumno

insertarAlumno(datosNuevoAlumno:Alumno):Promise<any>{
    let alumnoJson=datosNuevoAlumno.getJsonObject();
    delete alumnoJson.id;
    return this.angularFirestore.collection("alumnos").add(alumnoJson);
}//end_insertarAlumno
    
}//end_class