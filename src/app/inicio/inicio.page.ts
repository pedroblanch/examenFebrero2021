import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  idPartido:string='';

  constructor(private navCtrl: NavController ) { }

  ngOnInit() {
    
  }

  ejercicio3(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          idPartido: JSON.stringify(this.idPartido)
      }
    };
    this.navCtrl.navigateForward('/ejercicio3', navigationExtras);
  }



}//end_class
