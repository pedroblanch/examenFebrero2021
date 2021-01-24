import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from 'src/app/modelo/alumno';
import { InterfaceProvider } from 'src/app/modelo/interfaceProvider';

@Injectable()
export class StorageServiceProvider implements InterfaceProvider{
    
constructor(public storage: Storage){
}

/*
este método devuelve un objeto 'Promise'. Esto es un elemento asíncrono que puede finalizar de dos formas: correctamente, en cuyo caso sale con resolve, o bien de forma incorrecta, acabando en ese caso con reject.
El método llama al método get del atributo http, pasándole como parámetro la url que devuelve la colección alumnos de la Api. Lo que devuelve este método lo convertimos a Promise, para luego evaluar su resultado mediante then y catch.
Si el acceso a la Api ha ido bien el código que se ejecuta es el ubicado en la cláusula then. Si ha ido mal se ejecuta el código ubicado en la cláusula catch.
Si todo ha ido bien convertimos el array de objetos Json que nos llega a un array de objetos alumnos, y lo devolvemos con resolve.
Si el acceso ha ido mal devolvemos el mensaje de error que no llega mediante reject.
*/

getAlumnos():Observable<any>{
    let observable = new Observable<any>();
    return observable;
} 

/*
este método manda una solicitud de borrado a la Api del usuario con un id determinado.
Si el borrado va bien se sale son resolve devolviendo true.
Si el borrado va mal se sale con reject, devolviendo el mensaje de error que nos llega
*/

eliminarAlumno(id:number):Promise<void>{
    let promise = new Promise<void>((resolve, reject) => {
        
        });
        return promise;
}//end_eliminar_alumno

modificarAlumno(idAlumno:number, nuevosDatosAlumno:Alumno):Promise<void>{
    let promise = new Promise<void>((resolve, reject) => {

      });
      return promise;
}//end_modificarAlumno

insertarAlumno(datosNuevoAlumno:Alumno):Promise<Alumno>{
    let promise = new Promise<Alumno>((resolve, reject) => {
        
      });
      return promise;
}//end_insertarAlumno

/*
constructor(public storage: Storage) { }
 
  isFavorite(filmId) {
    return this.getAllFavoriteFilms().then(result => {
      return result && result.indexOf(filmId) !== -1;
    });
  }
 
  favoriteFilm(filmId) {
    return this.getAllFavoriteFilms().then(result => {
      if (result) {
        result.push(filmId);
        return this.storage.set(STORAGE_KEY, result);
      } else {
        return this.storage.set(STORAGE_KEY, [filmId]);
      }
    });
  }
 
  unfavoriteFilm(filmId) {
    return this.getAllFavoriteFilms().then(result => {
      if (result) {
        var index = result.indexOf(filmId);
        result.splice(index, 1);
        return this.storage.set(STORAGE_KEY, result);
      }
    });
  }
 
  getAllFavoriteFilms() {
    return this.storage.get(STORAGE_KEY);
  }
*/
    
}//end_class