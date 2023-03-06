import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})

export class UserFormComponent implements OnInit {

  title: string = 'Registro';
  userForm: FormGroup; 
  mensaje: string = "";
  type: string = "";

  constructor(
    private userService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.userForm = new FormGroup ({
      first_name: new FormControl("", [
        Validators.required, Validators.minLength(3)
      ]),
      last_name: new FormControl("", [
        Validators.required, Validators.minLength(2)
      ]),
      email: new FormControl("", [
        Validators.required, Validators.pattern(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/)
      ]),
      username: new FormControl("", [
        Validators.required, Validators.minLength(3)
      ]),
      image: new FormControl("", [
        Validators.required, Validators.pattern(/^(ht|f)tps?:\/\/\w+([\.\-\w]+)?\.[a-z]{2,10}(:\d{2,5})?(\/.*)?$/i)
      ])
    }, []);
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(async (params: any )=> {
      let id = (params.userid);
      if(id) {
        this.title = 'Actualizar';
        const response = await this.userService.getById(id);
        const user: User = response;

        this.userForm = new FormGroup ({

          _id: new FormControl(user?._id, []),
          first_name: new FormControl(user?.first_name, [
            Validators.required, Validators.minLength(3)
          ]),
          last_name: new FormControl(user?.last_name, [
            Validators.required, Validators.minLength(2)
          ]),
          email: new FormControl(user?.email, [
            Validators.required, Validators.pattern(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/)
          ]),
          username: new FormControl(user?.username, [
            Validators.required, Validators.minLength(3)
          ]),
          image: new FormControl(user?.image, [
            Validators.required, Validators.pattern(/^(ht|f)tps?:\/\/\w+([\.\-\w]+)?\.[a-z]{2,10}(:\d{2,5})?(\/.*)?$/i)
          ])
        }, []);
    }    
    })
  }

  async getDataForm() {
    let user = this.userForm.value;
    if(user._id) {

      let response = await this.userService.update(user);
      this.mensaje = `El usuario: ${response.first_name} con Id ${response.id} se ha actualizado correctamente :)`;
      this.type = "success";

      console.log(response);

    } else {
      try {

        let response = await this.userService.create(user)
        if(response.id) {
          this.mensaje = `El usuario: ${response.first_name} con Id ${response.id} se ha creado correctamente :)`;
          this.type = "success";

        console.log(response);
        }
      }
      catch (error) {
        console.log(error);
        }
    } 
  }

  check(pControlName: string, pError: string): boolean {
    if(this.userForm.get(pControlName)?.hasError(pError) && this.userForm.get(pControlName)?.touched) {
      return true
    } 
    return false
  }
}
