import { Component, OnInit } from '@angular/core';
import { EventEmitter } from 'events';
import { RoutingService } from '../routing.service';
import { HttpClient } from '@angular/common/http';
import { Result } from '../result';
import { EncryptService } from '../encrypt.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  password: string

  credentials = {
      username : "",
      password : ""
  }

  constructor(private routingService: RoutingService, private http: HttpClient, private _encryptor: EncryptService, 
    private _session: SessionService) { } 
  
  login()
  {
    this.credentials.password = this._encryptor.hash(this.password)
    this.http.post("http://localhost:9005/Project2Spring/api/login", this.credentials).subscribe(
      (data: Result) => {
        if (data.result == "success")
        {
          this._session.setUsername(this.credentials.username)
          this.routingService.emitChange('user-field')
        }
      },
      error => {
        console.log('Error occured', error);
      }
    )
  }

  ngOnInit() {
  }
}
