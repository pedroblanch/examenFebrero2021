import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ApiServiceProvider } from 'src/providers/api-service';
import { Alumno } from '../modelo/alumno';

export interface imgFile {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-editar-alumno',
  templateUrl: './editar-alumno.page.html',
  styleUrls: ['./editar-alumno.page.scss'],
})
export class EditarAlumnoPage implements OnInit {

  // Data passed in by componentProps
  @Input() alumnoJson;
  alumno:Alumno;
  validations_form: FormGroup;

  constructor( public formBuilder: FormBuilder,
        public modalCtrl: ModalController,
        public apiService:ApiServiceProvider) { }

  ngOnInit() {
    this.alumno=JSON.parse(this.alumnoJson);
    this.validations_form = this.formBuilder.group({
      id: new FormControl(this.alumno.id),
      first_name: new FormControl(this.alumno.first_name, Validators.compose([
      Validators.maxLength(50),
      Validators.minLength(1),
      Validators.pattern('^[a-z A-Z]+$'),
      Validators.required
      ])),
      last_name: new FormControl(this.alumno.last_name, Validators.compose([
        Validators.maxLength(50),
        Validators.minLength(1),
        Validators.pattern('^[a-z A-Z]+$'),
        Validators.required
        ])),
      email: new FormControl(this.alumno.email, Validators.compose([
        Validators.pattern('^[a-zA-Z0-9_.+-]+[@]{1}[a-zA-Z0-9-]+[.]{1}[a-zA-Z]+$'),
        Validators.required
        ])),
      address: new FormControl(this.alumno.address, Validators.compose([
          Validators.maxLength(50),
          Validators.minLength(1),
          Validators.pattern('^[a-z A-Z0-9]+$'),
          Validators.required
          ])),
      city: new FormControl(this.alumno.city, Validators.compose([
        Validators.maxLength(50),
        Validators.minLength(1),
        Validators.pattern('^[a-z A-Z]+$'),
        Validators.required
        ])),
      avatar: new FormControl(this.alumno.avatar, Validators.required),
      gender: new FormControl(this.alumno.gender, Validators.compose([
        Validators.required
        ]))
      });
  }

  onSubmit(values){
    this.modalCtrl.dismiss(JSON.stringify(values));
  }

  public closeModal() {
      this.modalCtrl.dismiss();
  }

  uploadImage(event: FileList){
    var file:File=event.item(0);
    var extension = file.name.substr(file.name.lastIndexOf('.') + 1);
    //doy al nombre del fichero un número aleatorio 
    //le pongo al nombre también la extensión del fichero
    var fileName= `${new Date().getTime()}.${extension}`;
    this.validations_form.controls.avatar.setValue("");
    this.apiService.uploadImage(file,fileName)
    .then( (downloadUrl)=>{
      this.alumno.avatar=downloadUrl;
      this.validations_form.controls.avatar.setValue(downloadUrl);
    })
    .catch((error)=>{
      console.log(error);
    });
  }

}
