import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceProviderFirebase } from 'src/providers/api-service-firebase';

@Component({
  selector: 'app-ejercicio1',
  templateUrl: './ejercicio1.page.html',
  styleUrls: ['./ejercicio1.page.scss'],
})
export class Ejercicio1Page implements OnInit {

  
  validations_form: FormGroup;
  urlAvatar1:string=null;
  urlAvatar2:string=null;
  urlAvatar3:string=null;

  constructor( public formBuilder: FormBuilder,
        public apiServiceFirebase:ApiServiceProviderFirebase) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      avatar1: new FormControl(this.urlAvatar1, Validators.required),
      avatar2: new FormControl(this.urlAvatar2, Validators.required),
      avatar3: new FormControl(this.urlAvatar3, Validators.required)
      });
  }

  onSubmit(values){
    //
  }

  public closeModal() {
      //
  }

  uploadImage1(event: FileList){
    var file:File=event.item(0);
    var extension = file.name.substr(file.name.lastIndexOf('.') + 1);
    //doy al nombre del fichero un número aleatorio 
    //le pongo al nombre también la extensión del fichero
    var fileName= `${new Date().getTime()}.${extension}`;
    this.validations_form.controls.avatar1.setValue("");
    this.apiServiceFirebase.uploadImage(file,fileName)
    .then( (downloadUrl)=>{
      this.urlAvatar1=downloadUrl;
      this.validations_form.controls.avatar1.setValue(downloadUrl);
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  uploadImage2(event: FileList){
    var file:File=event.item(0);
    var extension = file.name.substr(file.name.lastIndexOf('.') + 1);
    //doy al nombre del fichero un número aleatorio 
    //le pongo al nombre también la extensión del fichero
    var fileName= `${new Date().getTime()}.${extension}`;
    this.validations_form.controls.avatar2.setValue("");
    this.apiServiceFirebase.uploadImage(file,fileName)
    .then( (downloadUrl)=>{
      this.urlAvatar2=downloadUrl;
      this.validations_form.controls.avatar2.setValue(downloadUrl);
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  uploadImage3(event: FileList){
    var file:File=event.item(0);
    var extension = file.name.substr(file.name.lastIndexOf('.') + 1);
    //doy al nombre del fichero un número aleatorio 
    //le pongo al nombre también la extensión del fichero
    var fileName= `${new Date().getTime()}.${extension}`;
    this.validations_form.controls.avatar3.setValue("");
    this.apiServiceFirebase.uploadImage(file,fileName)
    .then( (downloadUrl)=>{
      this.urlAvatar3=downloadUrl;
      this.validations_form.controls.avatar3.setValue(downloadUrl);
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  close(){
    this.apiServiceFirebase.removeImage(this.urlAvatar1);
    this.apiServiceFirebase.removeImage(this.urlAvatar2);
    this.apiServiceFirebase.removeImage(this.urlAvatar3);
  }

}
