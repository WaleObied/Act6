import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  arrUsers: User[] = [];

  constructor(private usersService: UsersService) {}

   async ngOnInit(): Promise<void> {
    try{
    let resp = await this.usersService.getAll();
    this.arrUsers = resp.results;
    //console.log(this.arrUsers);
    }
    catch(error){
    console.log(error)
    }
  }


}
