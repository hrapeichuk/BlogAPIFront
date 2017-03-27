import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate() {
    if(!this.userService.isAdmin()) {
      this.router.navigate(['login']);
    }
    return this.userService.isAdmin();
  }
}
