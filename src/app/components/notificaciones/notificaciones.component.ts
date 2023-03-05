import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent {

  @Input () mensaje: string = "";
  notificacion: string = "";
  visible: boolean = false;
  @Input () type: string = "";

  constructor(private router: Router) { }

  ngDoCheck() {
    if(this.mensaje !== "") {
      this.notificacion = this.mensaje
      this.visible = true;
    }
  }

  cerrar(){
    this.notificacion = "";
    this.visible = false;
    this.router.navigate(['/home']);
  }
}
