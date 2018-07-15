import { Params } from './../../models/params.model';
import { RestClientService } from './../../services/restclient.service';
import { Component, OnInit } from '@angular/core';
import { RestClient } from './../../models/restclient.model';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

import { Router } from "@angular/router";

@Component({
  selector: 'app-restclient',
  templateUrl: './restclient.component.html',
  styleUrls: ['./restclient.component.css']
})
export class RestclientComponent implements OnInit {
  restClientForm: FormGroup;
  restclients: Array<RestClient> = new Array<RestClient>();

  params: Array<Params> = new Array<Params>();

  getType: string = "GET";
  postType: string = "POST";
  publicURLType: string = "Public";
  privateURLType: string = "Private";
  urlParams: Array<Params> = new Array<Params>();
  selectedUrlId: number;
  errorMessage: string;
  result: any[];

  constructor(private fb: FormBuilder,
    private router: Router, private restclientservice: RestClientService) {
    this.createForm();
  }
  createForm() {
    this.restClientForm = this.fb.group({
      endpoints: ['', Validators.required]
    });
  }


  ngOnInit() {
    this.setRestClients();
    this.setAPIParams();
  }
  onChange(selectedId) {
    this.selectedUrlId = selectedId;
    this.urlParams = this.params.filter(data => data.restClientId == selectedId);
  }

  callApi() {
    if (this.selectedUrlId != 0) {
      this.errorMessage = "";
      let restClient = this.restclients.filter(c => c.id == this.selectedUrlId);
      if (restClient[0].type == "GET") {
        this.restclientservice.getCallApi(restClient[0], this.urlParams).subscribe(data => {
          console.log(data);
          this.result = data;
        }, error => {
          this.errorMessage = error.error.error;
        });
      } else {
        this.restclientservice.postCallApi(restClient[0], this.urlParams).subscribe(data => {
          console.log(data);
          this.result = data;
        }, error => {
          this.errorMessage = error.error.error;
        });
      }
    }
  }

  setRestClients() {
    let localauth = localStorage.getItem("auth");
    let auth = JSON.parse(localauth);
    this.restclients.push(new RestClient(1, auth.public_url + "/api/status", this.getType, this.publicURLType));
    this.restclients.push(new RestClient(2, auth.private_url + "/api/status", this.getType, this.privateURLType));

    this.restclients.push(new RestClient(3, auth.public_url + "/api/peers", this.getType, this.publicURLType));
    this.restclients.push(new RestClient(4, auth.public_url + "/api/peers", this.postType, this.publicURLType));

    this.restclients.push(new RestClient(5, auth.public_url + "/api/wallet", this.postType, this.publicURLType));

    this.restclients.push(new RestClient(6, auth.public_url + "/api/tokens", this.postType, this.publicURLType));
    this.restclients.push(new RestClient(7, auth.private_url + "/api/tokens", this.getType, this.privateURLType));

    this.restclients.push(new RestClient(8, auth.public_url + "/api/blocks", this.postType, this.publicURLType));
  }

  setAPIParams() {
    this.params.push(new Params(3, "id", ""));

    this.params.push(new Params(4, "id", ""));
    this.params.push(new Params(4, "url", ""));

    this.params.push(new Params(5, "publicKey", ""));
    this.params.push(new Params(5, "privateKey", ""));
  }

}
