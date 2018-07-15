import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Auth } from './../../models/auth.model';
import {Router} from "@angular/router";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  angForm: FormGroup;
  submitted: boolean = false;
  invalidURL: boolean = false;
  auth: Auth = new Auth();

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.createForm();
  }
  createForm() {
    this.angForm = this.fb.group({
      public_url: ['', Validators.required],
      private_url: ['', Validators.required]
    });
  }


  ngOnInit() {

  }

  checkApiUrl(): void {
    this.invalidURL = false;
    localStorage.setItem('auth', "");
    localStorage.clear();
    this.auth.private_url = this.angForm.controls["private_url"].value;
    this.auth.public_url = this.angForm.controls["public_url"].value;
    this.authService.checkServices(this.auth)
      .subscribe(data => {
        console.log(data);
        if (data[0].status == "OK" && data[1].status == "OK") {
          localStorage.setItem('auth', JSON.stringify(this.auth));
          this.router.navigate(['restclient']);
        } else {
          this.invalidURL = true;
        }
      });
  }
}
