import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  userForm: FormGroup; 

  constructor() {
    this.userForm = new FormGroup ({
      first_name: new FormControl("", []),
      last_name: new FormControl("", []),
      email: new FormControl("", []),
      image: new FormControl("", [])
    }, []);
  }

  getDataForm() {
    console.log(this.userForm.value);
  }
}
