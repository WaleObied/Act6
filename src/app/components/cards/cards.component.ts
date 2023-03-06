import { Component, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {

  @Input() miUser!: User;

  constructor(private usersServices: UsersService) {
    
  }

async deleteUser(pId: string | undefined): Promise<void> {
  if(pId !== undefined) {
    try {
      let response = await this.usersServices.delete(pId);
      
        confirm('¿Esta seguro que desea borrar este usuario?')
    } catch (error) {
      console.log(error);
    }
    }
  }
}
