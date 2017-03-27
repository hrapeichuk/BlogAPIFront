import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { UserService } from '../../user/user.service';

@Component({
  selector: 'users',
  templateUrl: 'users.component.html',
  styleUrls: ['../../app.component.css']
})

export class UsersComponent implements OnInit {
  data: Object;

  constructor (private userService: UserService) {}

  ngOnInit(): void {
    this.displayUsers();
  }

  displayUsers() {
    this.userService.getAllUsers()
      .subscribe((response: Response) => {
        this.data = response.json();
      });
  }
}