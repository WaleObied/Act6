import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
      first_name: new FormControl("", []),
      last_name: new FormControl("", []),
      email: new FormControl("", []),
      image: new FormControl("", [])
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
          first_name: new FormControl(user?.first_name, []),
          last_name: new FormControl(user?.last_name, []),
          email: new FormControl(user?.email, []),
          image: new FormControl(user?.image, [])
        }, []);
    }
      
    })
  }

  async getDataForm() {
    let user = this.userForm.value;
    if(user._id) {

      let response = await this.userService.update(user);
      this.mensaje = `El usuario: ${response.first_name} con Id ${response.id} se ha actualizado correctamente`;
      this.type = "success";
        //this.router.navigate(['/home']);

      console.log(response);

    } else {
      try {

        let response = await this.userService.create(user)
        if(response.id) {
          this.mensaje = `El usuario: ${response.first_name} con Id ${response.id} se ha creado correctamente`;
          this.type = "success";
        //this.router.navigate(['/home']);

        console.log(response);
        }
      }
      catch (error) {
        console.log(error);
        }

    }


    
  }
}
