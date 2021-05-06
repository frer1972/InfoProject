import { Component, OnInit } from '@angular/core';
import { EncryptService } from '../encrypt.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { SessionService } from '../session.service';
import { User } from '../user';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit { 

  baseUrl: string = "http://localhost:9005/Project2Spring/api/"
  src: string = "../../assets/user.png"
  user: User

  password: string;
  cpassword: string;

  updateInfo = {
    username : this._session.username, 
    password : ""
  }

  async uploadFile(event)
  {
    let file = event.target.files[0]
    let urlResponse = await fetch(this.baseUrl + 's3/' + file.name, {
      method: 'PUT'
    })
    let signedUrl = await urlResponse.text()

    let s3Response = await fetch(signedUrl, {
      method: 'PUT',
      body: file
    })
    this.updateProfilePicture(file.name)
    this.getFile()
  }

  updateProfilePicture(filename: string)
  {
    let image = {
      name : filename,
      username : this._session.getUsername()
    }

    this._http.post(this.baseUrl + 'updateImage', image).subscribe()
    alert("Image has been uploaded")
  }

  async getFile()
  {
    let getImageRespone = await fetch(this.baseUrl + 'getProfilePic/' + this._session.username, {
        method: 'GET'
    })
    let imageName = await getImageRespone.text()

    let urlResponse = await fetch(this.baseUrl + 's3/' + imageName, {
    method: 'GET'
    });
    let signedUrl = await urlResponse.text();

    this.src = signedUrl
  }

  getUserInformation(username: string)
  {
    this._http.get(this.baseUrl + 'getLoggedInUser/' + username).subscribe(
      (data: User) => {
        this.user = data
      }
    )
  }  

  togglePage() {
    this._toggle.toggleLogOut();
  }

  constructor(private _http: HttpClient, private _router: Router, private _encryptor: EncryptService, 
    private _toggle: AppComponent, private _session: SessionService) { 
      this.getFile()
      this.getUserInformation(this._session.username) 
    }

  ngOnInit() {
  }

  savePassword()
  {
    this.updateInfo.password = this._encryptor.hash(this.cpassword)
    this._http.post("http://localhost:9005/Project2Spring/api/passwordReset", this.updateInfo).subscribe()
    alert('Your password was updated');
  }
  
}
