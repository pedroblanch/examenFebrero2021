import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiServiceProviderFirebase } from 'src/providers/api-service-firebase';
import { ApiServiceJsonServerProvider } from 'src/providers/api-service-jsonserver';
import { Partido } from '../modelo/partido';


@Component({
  selector: 'app-ejercicio2',
  templateUrl: './ejercicio2.page.html',
  styleUrls: ['./ejercicio2.page.scss'],
})
export class Ejercicio2Page implements OnInit {

  partidosDisputados:Array<Partido>=new Array<Partido>();
  partidosNoDisputados:Array<Partido>=new Array<Partido>();

  constructor( public apiServiceJsonServer: ApiServiceJsonServerProvider,
               public apiServiceFirebase: ApiServiceProviderFirebase,
               public toastController: ToastController) { }

  ngOnInit() {

    this.apiServiceJsonServer.getPartidosDisputados()
    .then( (partidos:Array<Partido>)=>{
      this.partidosDisputados=partidos;
    })
    .catch((error:string)=>{
      console.log(error);
    });

    this.apiServiceJsonServer.getPartidosNoDisputados()
    .then( (partidos:Array<Partido>)=>{
      this.partidosNoDisputados=partidos;
    })
    .catch((error:string)=>{
      console.log(error);
    });

  }

  uploadToFirebase(indice:number, disputado:boolean){
    var partido:Partido;
    if(disputado)
      partido=this.partidosDisputados[indice];
    else
      partido=this.partidosNoDisputados[indice];
    this.apiServiceFirebase.getPartidoPorFechaEquipoLocalEquipoVisitante(partido.fecha, partido.equipoLocal, partido.equipoVisitante)
    .then((partidoDevuelto)=>{
      if(!partidoDevuelto){
        this.apiServiceFirebase.insertarPartido(partido)
        .then((response)=>{
          this.presentToast('Inserción correcta en firebase');
        })
        .catch((error)=>{
          console.log(error);
        });
      }
      else{
        this.presentToast('Ya se ha subido el partido a firebase');
      }
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}//end_class
