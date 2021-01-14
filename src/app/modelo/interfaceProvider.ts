import { Alumno } from './alumno';

export interface InterfaceProvider {
    getAlumnos():Promise<Alumno[]>;
    eliminarAlumno(id:number):Promise<Boolean>;
    modificarAlumno(idAlumno:number, nuevosDatosAlumno:Alumno):Promise<Alumno>;
    insertarAlumno(datosNuevoAlumno:Alumno):Promise<Alumno>;
}