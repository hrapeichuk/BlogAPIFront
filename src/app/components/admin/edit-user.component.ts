import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../../user/user.service';

@Component({
  selector: 'edit-user',
  templateUrl: 'edit-user.component.html',
  styleUrls: ['../../app.component.css']
})

export class EditUserComponent implements OnInit {
  data: Object;
  error: null;
  editUserForm : FormGroup;

  constructor(fb: FormBuilder, private userService: UserService, private  activatedRoute: ActivatedRoute, private router: Router) {
    let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';

    this.editUserForm = fb.group({
      'firstname': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15)])],
      'lastname': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(15)])],
      'email': [null, Validators.compose([Validators.required, Validators.pattern(emailRegex)])]
    })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      let userId = params['id'];
      this.getUserData(userId);
    });
  }

  getUserData(id) {
    this.userService.getUserById(id)
      .subscribe((response: Response) => {
        this.data = response.json();
      });
  }

  editUser(firstname: HTMLInputElement, lastname: HTMLInputElement, email: HTMLInputElement, rights: HTMLInputElement) {
    this.error = null;

    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];

    this.userService.editProfile(id, firstname, lastname, email, rights)
      .subscribe(
        (response: Response) => {
          this.data = response.json();

          this.router.navigate(['admin/users']);
        },
        (error) => this.error = error.json().error
      );
    });
  }
}