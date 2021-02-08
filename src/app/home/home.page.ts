import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ApiServiceProvider } from 'src/providers/api-service';
import { EditarAlumnoPage } from '../editar-alumno/editar-alumno.page';
import { Alumno } from '../modelo/alumno';

import { Storage } from '@ionic/storage';
import { FirebaseAuthService } from 'src/providers/firebase-auth.service';

enum storageTypeEnum {
  JSON_SERVER='JSON_SERVER',
  FIREBASE='FIREBASE'
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  private alumnos=new Array<Alumno>();

  constructor(private apiService: ApiServiceProvider,
    public alertController:AlertController, public modalController: ModalController,
    private storage: Storage, public toastController: ToastController,
    public firebaseAuthService:FirebaseAuthService) {
  }

/*
cuando se carga la pantalla se llama al método getAlumnos de la Api. Este es un método asíncrono que devuelve un objeto Promise del que debe ser evaluado el resultado.
Si el acceso a la Api ha ido bien se ejecuta el código asociado a la cláusula then.  Símplemente se coge el array de alumnos que llega y se asocia a él el atributo alumnos de la clase.
Si ha ido mal el acceso (por ejemplo si no hemos lanzado jsonServer) se coge el error que llega y se muestra por consola.
*/


  ngOnInit(): void {
    //this.apiService.loadFiles();
    this.apiService.getAlumnos().subscribe((resultadoConsultaAlumnos) => {
      this.alumnos = new Array<Alumno>();
      resultadoConsultaAlumnos.forEach((datosTarea: any) => {
        let alumnoJsonObject=datosTarea.payload.doc.data();
        alumnoJsonObject.id=datosTarea.payload.doc.id,
        this.alumnos.push(
          Alumno.createFromJsonObject(alumnoJsonObject)
        );
      });
    })
    /*prueba de registro de usuario
    /*
    this.firebaseAuthService.registerUser("pedroblanch@iesjulioverne.es","123456")
      .then( (data)=>{
        console.log("Registro correcto");
      })
      .catch( (error)=>{
          console.log("Error en el registro: "+error['message']);
      });
      */

      /*prueba de login
      Si el login no fuese correcto no dejaría subir ficheros al storage, pues sus 
      reglas obligan a que lo haga un usuario logueado
      */
     this.firebaseAuthService.loginUser("pedroblanch@iesjulioverne.es","123456")
      .then( (data)=>{
        console.log("login correcto");
        this.firebaseAuthService.userDetails()
          .subscribe( data => {
            console.log(data);
          });
      })
      .catch( (error)=>{
          console.log("Error en el login: "+error['message']);
      });

  }//end_ngOnInit

/*
este método llama al método eliminarAlumno de la Api y le pasa el id del alumno a eliminar. Se devuelve un objeto Promise. Si el borrado ha ido bien se ejecuta el código asociado a la cláusula then. Símplemente se muestra por consola un mensaje y se elimina el alumno del array de alumnos de la clase, lo que hará que deje de verse en la vista.
Si el borrado ha ido mal muestro por consola el error que ha ocurrido.
*/
  eliminarAlumno(indice:number){
    var urlAvatar=this.alumnos[indice].avatar;
    this.apiService.eliminarAlumno(this.alumnos[indice].id)
    .then( () => {
      //los datos del alumno se han eliminado correctamente de cloud firestore
      //elimino la imagen de avatar del storage de firebase
      this.apiService.removeImage(urlAvatar);
      //this.alumnos.splice(indice,1);  No hace falta quitarlo del array. Se recarga todo el array de forma automática
    })
    .catch( (error:string) => {
        this.presentToast("Error al borrar: "+error);
    });
  }//end_eliminar_alumno

 async modificarAlumno(indice:number) {
  const modal = await this.modalController.create({
    component: EditarAlumnoPage,
    componentProps: {
      'alumnoJson': JSON.stringify(this.alumnos[indice])
    }
  });

  modal.onDidDismiss().then((data) => {
    if (data['data'] != null) { 
      let alumnoJSON=JSON.parse(data['data']);
      let alumnoModificado:Alumno = Alumno.createFromJsonObject(alumnoJSON);
      this.apiService.modificarAlumno(alumnoModificado.id,alumnoModificado)  //se hace PUT a la API
              .then( ()=> {
                //this.alumnos[indice]=alumnoModificado;  //si se ha modificado en la api se actualiza en la lista
              })
              .catch( (error:string) => {
                  this.presentToast("Error al modificar: "+error);
              });
    }
  });
  
  return await modal.present();
} //end_modificarAlumno


async nuevoAlumno() {
  const modal = await this.modalController.create({
    component: EditarAlumnoPage,
    componentProps: {
      'alumnoJson': JSON.stringify(new Alumno(-1,
        "","","","","","",""))
    }
  });

  modal.onDidDismiss().then((data) => {
    if (data['data'] != null) { 
      let alumnoJSON=JSON.parse(data['data']);
      let alumnoNuevo:Alumno = Alumno.createFromJsonObject(alumnoJSON);      
      this.apiService.insertarAlumno(alumnoNuevo)  //se hace POST a la API
              .then( (alumno:Alumno)=> {
                //this.alumnos.push(alumno);  //si se ha insertado en la api se añade en la lista
              })
              .catch( (error:string) => {
                  this.presentToast("Error al insertar: "+error);
              });
    }
  });
  
  return await modal.present();
} //end_nuevoAlumno

async presentToast(message:string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000
  });
  toast.present();
}

}//end_class