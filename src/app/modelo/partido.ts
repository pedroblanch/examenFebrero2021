export class Partido {

    constructor(public id:string,
        public fecha:string,
        public equipoLocal:string,
        public equipoVisitante:string,
        public puntosLocal:number,
        public puntosVisitante:number,
        public finalizado:boolean
        )
    {  }
    
    public static createFromJsonObject(jsonObject:any):Partido
    {
        let partido:Partido= new Partido(jsonObject['id'],
            jsonObject['fecha'],
            jsonObject['equipoLocal'],
            jsonObject['equipoVisitante'],
            jsonObject['puntosLocal'],
            jsonObject['puntosVisitante'],
            jsonObject['finalizado']);
            return partido;
    }

    public getJsonObject():any
    {
        let jsonObject:any={};
        jsonObject['id']=this.id;
        jsonObject['fecha']=this.fecha;
        jsonObject['equipoLocal']=this.equipoLocal;
        jsonObject['equipoVisitante']=this.equipoVisitante;
        jsonObject['puntosLocal']=this.puntosLocal;
        jsonObject['puntosVisitante']=this.puntosVisitante;
        jsonObject['finalizado']=this.finalizado;
        return jsonObject;
    }
                
}//end_class