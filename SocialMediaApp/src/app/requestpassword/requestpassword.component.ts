import { Component, OnInit } from '@angular/core';
import { EncryptService } from '../encrypt.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requestpassword',
  templateUrl: './requestpassword.component.html',
  styleUrls: ['./requestpassword.component.css']
})
export class RequestpasswordComponent implements OnInit {

password:string;

user = {
  email: "",
  passWord: "",
  ecryptP:""
}

  constructor(private _http: HttpClient, private _router: Router, private _encryptor: EncryptService) { }

  getRandomSpan(){ 
    return Math.floor((Math.random()*6)+1); 
  }; 

  requetP()
  {
    this.password = "begin" + this.getRandomSpan() + "end";
    this.user.passWord = this.password;
    this.user.ecryptP = this._encryptor.hash(this.password);
    this._http.post("http://localhost:9005/Project2Spring/api/email", this.user).subscribe()
    this._router.navigate(['app-changepassword'])
  }

  ngOnInit() {
  }

}
