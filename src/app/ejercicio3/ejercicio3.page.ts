import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiServiceJsonServerProvider } from 'src/providers/api-service-jsonserver';
import { Partido } from '../modelo/partido';

@Component({
  selector: 'app-ejercicio3',
  templateUrl: './ejercicio3.page.html',
  styleUrls: ['./ejercicio3.page.scss'],
})
export class Ejercicio3Page implements OnInit{

  idPartido;
  partido:Partido;
  pilaPuntosLocal:number[]=new Array<number>();
  pilaPuntosVisitante:number[]=new Array<number>();

  constructor(public apiServiceJsonServer:ApiServiceJsonServerProvider,
    public alertController:AlertController, public activatedRoute: ActivatedRoute) { 
      this.activatedRoute.queryParams.subscribe(params => {
        this.idPartido = JSON.parse(params['idPartido']);
      });  
    }

  ngOnInit() {
      
    this.apiServiceJsonServer.getPartido(this.idPartido)
    .then( (partido)=>{
        this.partido=partido;
        console.log(this.partido);
    })
    .catch((error)=>  {
      this.partido=null;
      console.log(error);
    });
  }

  incrementarPuntuacion(equipo:string, puntos:number){
    console.log(equipo);
      switch(equipo){
        case 'local':
          this.partido.puntosLocal+=puntos;
          this.pilaPuntosLocal.push(puntos);
          this.modificarPartido();
          break;
        case 'visitante':
          this.partido.puntosVisitante+=puntos;
          this.pilaPuntosVisitante.push(puntos);
          this.modificarPartido();
          break
      }
  }

  anularPuntuacion(equipo:string){
    switch(equipo){
      case 'local':
        if(this.pilaPuntosLocal.length>0){
          this.partido.puntosLocal-=this.pilaPuntosLocal.pop();
          this.modificarPartido();
        }
        break;
      case 'visitante':
        if(this.pilaPuntosVisitante.length>0){
          this.partido.puntosVisitante-=this.pilaPuntosVisitante.pop();
          this.modificarPartido();
        }
        break
    }
  }

  modificarPartido(){
    this.apiServiceJsonServer.modificarPartido(this.partido.id,this.partido)
    .then( (partido:Partido)=>{
      console.log("Modificacion correcta");
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  async finalizarPartido() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '¿Finalizar partido?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.partido.finalizado=true;
            this.modificarPartido();
          }
        }
      ]
    });

    await alert.present();
  }



}//end_class
