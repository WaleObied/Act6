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
  pagActual: number = 1;
  totalPages: number = 1;

  constructor(private usersService: UsersService) {}

   async ngOnInit(): Promise<void> {
    this.pPage();
  }

  async pPage(pNum: number = 1): Promise<void> {

    try{
      let resp = await this.usersService.getAll(pNum)
      console.log(resp);
      this.pagActual = resp.page;
      this.totalPages = resp.total_pages;
      this.arrUsers = resp.results;
      
      }
      catch(error){
      console.log(error)
      }
  }

}
