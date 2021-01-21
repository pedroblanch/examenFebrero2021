import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ApiServiceProvider } from 'src/providers/api-service';
import { EditarAlumnoPage } from '../editar-alumno/editar-alumno.page';
import { Alumno } from '../modelo/alumno';

import { Storage } from '@ionic/storage';

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
  private storageType:string;
  

  constructor(private apiService: ApiServiceProvider,
    public alertController:AlertController, public modalController: ModalController,
    private storage: Storage, public toastController: ToastController) {
  }

/*
cuando se carga la pantalla se llama al método getAlumnos de la Api. Este es un método asíncrono que devuelve un objeto Promise del que debe ser evaluado el resultado.
Si el acceso a la Api ha ido bien se ejecuta el código asociado a la cláusula then.  Símplemente se coge el array de alumnos que llega y se asocia a él el atributo alumnos de la clase.
Si ha ido mal el acceso (por ejemplo si no hemos lanzado jsonServer) se coge el error que llega y se muestra por consola.
*/


  ngOnInit(): void {
    this.storage.get('storageType')
    .then((val) => {
      if(val!=null)
        this.storageType=val;
      else
        this.storageType=storageTypeEnum.JSON_SERVER;
      switch(this.storageType){
        case storageTypeEnum.JSON_SERVER:
          this.apiService.getAlumnos()
            .then( (alumnos:Alumno[])=> {
              this.alumnos=alumnos;
            })
            .catch( (error:string) => {
                this.presentToast("Error al obtener alumnos: "+error);
            });
          break;
        case storageTypeEnum.FIREBASE:
          this.presentToast("Aún no se ha implementado la conexión a firebase");
          break;
      }
      })
    .catch( () => {this.presentToast("Error al recuperar variable tipo de conexión");});
  }


/*
este método llama al método eliminarAlumno de la Api y le pasa el id del alumno a eliminar. Se devuelve un objeto Promise. Si el borrado ha ido bien se ejecuta el código asociado a la cláusula then. Símplemente se muestra por consola un mensaje y se elimina el alumno del array de alumnos de la clase, lo que hará que deje de verse en la vista.
Si el borrado ha ido mal muestro por consola el error que ha ocurrido.
*/
  eliminarAlumno(indice:number){
    this.apiService.eliminarAlumno(this.alumnos[indice].id)
    .then( (correcto:boolean ) => {
      this.alumnos.splice(indice,1);
    })
    .catch( (error:string) => {
        this.presentToast("Error al borrar: "+error);
    });
  }//end_eliminar_alumno

  /*
  async modificarAlumno(indice:number) {
    let alumno=this.alumnos[indice];
    const alert = await this.alertController.create({
      header: 'Modificar',
      inputs: [
        {
          name: 'first_name',
          type: 'text',
          value: alumno.first_name,
          placeholder: 'first_name'
        },
        {
          name: 'last_name',
          type: 'text',
          id: 'last_name',
          value: alumno.last_name,
          placeholder: 'last_name'
        },
        {
          name: 'email',
          id: 'email',
          type: 'text',
          value: alumno.email,
          placeholder: 'email'
        },
        {
          name: 'gender',
          type: 'radio',
          label: 'Male',
          value: 'Male',
          checked: true
        },
        {
          name: 'avatar',
          value: alumno.avatar,
          type: 'url',
          placeholder: 'avatar'
        },
        {
          name: 'address',
          value: alumno.address,
          type: 'text',
          placeholder: 'address'
        },
        {
          name: 'city',
          value: alumno.city,
          type: 'text',
          placeholder: 'city'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log(data);
            var alumnoModificado:Alumno=new Alumno(alumno.id,
              data['first_name'],
              data['last_name'],
              data['email'],
              data['gender'],
              data['avatar'],
              data['address'],
              data['city']);
            this.apiService.modificarAlumno(alumno.id,alumnoModificado)
              .then( (alumno:Alumno)=> {
                this.alumnos[indice]=alumno;
              })
              .catch( (error:string) => {
                  console.log(error);
              });
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }//end_modificarAlumno
  */


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
              .then( (alumno:Alumno)=> {
                this.alumnos[indice]=alumno;  //si se ha modificado en la api se actualiza en la lista
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
                this.alumnos.push(alumno);  //si se ha insertado en la api se añade en la lista
              })
              .catch( (error:string) => {
                  this.presentToast("Error al insertar: "+error);
              });
    }
  });
  
  return await modal.present();
} //end_nuevoAlumno

async settings() {
  let checkedJsonServer:boolean=false;
  let checkedFirebase:boolean=false;
  switch(this.storageType){
    case storageTypeEnum.JSON_SERVER:
      checkedJsonServer=true;
      break;
    case storageTypeEnum.FIREBASE:
      checkedFirebase=true;
      break;
  }
  const alert = await this.alertController.create({
    header: 'settings',
    inputs: [
      {
        name: 'json-server',
        type: 'radio',
        label: 'json-server',
        value: storageTypeEnum.JSON_SERVER,
        checked: checkedJsonServer
      },
      {
        name: 'firebase',
        type: 'radio',
        label: 'firebase',
        value: storageTypeEnum.FIREBASE,
        checked: checkedFirebase
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
        }
      }, {
        text: 'Ok',
        handler: (data) => {
          this.storage.set('storageType',data).then((data)=>{
            this.storageType=data 
            switch(this.storageType){
              case storageTypeEnum.JSON_SERVER:
                this.apiService.getAlumnos()
                  .then( (alumnos:Alumno[])=> {
                    this.alumnos=alumnos;
                  })
                  .catch( (error:string) => {
                      this.alumnos=new Array<Alumno>();
                      this.presentToast("Error al obtener alumnos: "+error);
                  });
                break;
              case storageTypeEnum.FIREBASE:
                this.alumnos=new Array<Alumno>();
                this.presentToast("Aún no se ha implementado la conexión a firebase");
                break;
            }//end_switch
          });
        }
      }
    ]
  });

  await alert.present();
}//end_settings

async presentToast(message:string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000
  });
  toast.present();
}

}//end_class