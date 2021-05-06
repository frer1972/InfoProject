import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EncryptService } from '../encrypt.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  password: string

  user = {
    userName : "",
    passWord : "",
    lastName : "",
    firstName : "",
    address : "",
    email : ""
  }

  constructor(private _http: HttpClient, private _router: Router, private _encryptor: EncryptService) { }

  register()
  {
    this.user.passWord = this._encryptor.hash(this.password)
    this._http.post("http://localhost:9005/Project2Spring/api/register", this.user).subscribe()    
    this._router.navigate(['sign-in'])
  }

  ngOnInit() { } 
}
