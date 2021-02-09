import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Partido } from 'src/app/modelo/partido';

@Injectable()
export class ApiServiceJsonServerProvider {
    
    private URL="http://localhost:3000";

    constructor(public http: HttpClient){
    }

getPartidosDisputados():Promise<Partido[]> {
    let promise = new Promise<Partido[]>((resolve, reject) => {
        this.http.get(this.URL+"/partidos").toPromise()
            .then((data:any)=>{
                let partidos=new Array<Partido>();
                data.forEach(partidoJson => {
                    let partido=Partido.createFromJsonObject(partidoJson);
                    if(partido.finalizado)
                        partidos.push(partido);
                });
                resolve(partidos);
            })
            .catch( (error:Error)=>{
                reject(error.message);
            });
    });
    return promise;
}

getPartidosNoDisputados():Promise<Partido[]> {
    let promise = new Promise<Partido[]>((resolve, reject) => {
        this.http.get(this.URL+"/partidos").toPromise()
            .then((data:any)=>{
                let partidos=new Array<Partido>();
                data.forEach(partidoJson => {
                    let partido=Partido.createFromJsonObject(partidoJson);
                    if(!partido.finalizado)
                        partidos.push(partido);
                });
                resolve(partidos);
            })
            .catch( (error:Error)=>{
                reject(error.message);
            });
    });
    return promise;
}

getPartido(id:string):Promise<Partido> {
    let promise = new Promise<Partido>((resolve, reject) => {
        this.http.get(this.URL+"/partidos/"+id).toPromise()
            .then((data:any)=>{
                var partido=Partido.createFromJsonObject(data);
                resolve(partido);
            })
            .catch( (error:Error)=>{
                reject(error.message);
            });
    });
    return promise;
}

modificarPartido(idPartido:string, nuevosDatosPartido:Partido):Promise<Partido>{
    let promise = new Promise<Partido>((resolve, reject) => {
        var header = { "headers": {"Content-Type": "application/json"} };
        let datos = nuevosDatosPartido.getJsonObject();
        this.http.put(this.URL+"/partidos/"+idPartido,
                          JSON.stringify(datos),
                          header).toPromise().then(
          (data:any) => { // Success
            let partido:Partido;
                partido=Partido.createFromJsonObject(data);
            resolve(partido);
          }
        )
        .catch((error:Error)=>{
          reject(error.message);});
      });
      return promise;
}//end_modificarPartido

    
}//end_class