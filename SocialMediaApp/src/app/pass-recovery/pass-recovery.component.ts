import { Component, OnInit } from '@angular/core';
import { EncryptService } from '../encrypt.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pass-recovery',
  templateUrl: './pass-recovery.component.html',
  styleUrls: ['./pass-recovery.component.css']
})
export class PassRecoveryComponent implements OnInit {
  password:string;

  user = {
    email: "",
    passWord: "",
    ecryptP:""
  }
  constructor(private _http: HttpClient,  private _encryptor: EncryptService) { }

  getRandomSpan(){ 
    //return Math.floor((Math.random()*6)+1); 

    return ("" + (Math.random() * 10000000)).substring(1,7);
  }; 

  requetP()
  {
    this.password = "begin" + this.getRandomSpan() + "end";
    this.user.passWord = this.password;
    this.user.ecryptP = this._encryptor.hash(this.password);
    this._http.post("http://localhost:9005/Project2Spring/api/email", this.user).subscribe()
    
  }


  ngOnInit() {
  }

}
