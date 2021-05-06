import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../../app.component';
import { SessionService } from 'src/app/session.service';
import { User } from '../../user';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {
  myresponse: any;
  profileDataInput = {
    username : this._session.username,
    firstName: "",
    lastName: "",
    email: "",
    address: ""
  }

  baseUrl: string = "http://localhost:9005/Project2Spring/api/"

  src: string = "../../assets/user.png"

  user: User

  APP_URL = 'http://localhost:9005/Project2Spring/api';

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
  }

  updateProfilePicture(filename: string)
  {
    let image = {
      name : filename,
      username : this._session.getUsername()
    }

    this._http.post(this.baseUrl + 'updateImage', image).subscribe(
      data => {
        this.getFile()
        alert("Image has been uploaded")
      }
    )
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

  constructor(private _http: HttpClient, private _session: SessionService, private _toggle: AppComponent) {
    this.getFile()
    this.getUserInformation(this._session.username)
  }

  ngOnInit() {
    this._http.get(this.APP_URL + '/getLoggedInUser/' + this._session.username).subscribe(
      data => {
        this.myresponse = data;
      },
      error => {
        console.log('Error occured', error);
      }
    )
  }

  updateProfile() {
    this.profileDataInput.firstName = this.myresponse.firstName;
    this.profileDataInput.lastName = this.myresponse.lastName;
    this.profileDataInput.email = this.myresponse.email;
    this.profileDataInput.address = this.myresponse.address;

    this._http.post("http://localhost:9005/Project2Spring/api/updateUser", this.profileDataInput).subscribe(
      data => {
        this.getUserInformation(this._session.username)
        alert('Your profile was updated');
      }
    )
  }

  togglePage() {
    this._toggle.toggleLogOut();
  }

}
