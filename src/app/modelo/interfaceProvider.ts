import { Observable } from 'rxjs';
import { Alumno } from './alumno';

export interface InterfaceProvider {
    getAlumnos():Observable<any>;
    eliminarAlumno(id:number):Promise<void>;
    modificarAlumno(idAlumno:number, nuevosDatosAlumno:Alumno):Promise<void>;
    insertarAlumno(datosNuevoAlumno:Alumno):Promise<Alumno>;
}