import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {

  user!: User | any;
  
  constructor(private servicioUser: UsersService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe (async (params: any )=> {
      let id: string = (params.id);
      console.log(id);
      let res: any = await this.servicioUser.getById(id);
      this.user = res;
      console.log(res);

      
  })
}

}
