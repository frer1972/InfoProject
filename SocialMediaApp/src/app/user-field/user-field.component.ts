import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { SessionService } from '../session.service';
import { User } from '../user';
import { Post } from '../post';

@Component({
  selector: 'app-user-field',
  templateUrl: './user-field.component.html',
  styleUrls: ['./user-field.component.css']
})
export class UserFieldComponent implements OnInit {

  tData: string;
  tDatas: Array<Post>
  like: number = 0;
  likes: Array<number> = [];

  postObj = {
    username : this._session.username,
    content : ''
  }

  baseUrl: string = "http://localhost:9005/Project2Spring/api/"

  src: string = "../../assets/user.png"

  user: User

  likeCount() {
    this.like += 1;
    this.likes.push(this.like);    
  }

   async inputData() {
    if (this.tData !== '' && this.tData !== null) {
      this.postObj.content = this.tData
      this._http.post(this.baseUrl + 'addPost', this.postObj).subscribe(
        data => {
          this.getPosts()
        }
      )
    }
  }

  async uploadFile(event) {
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

  updateProfilePicture(filename: string) {
    let image = {
      name: filename,
      username: this._session.getUsername()
    }

    this._http.post(this.baseUrl + 'updateImage', image).subscribe(
      data => {
        this.getFile(this._session.username)
        alert("Image has been uploaded")
      }
    )
    
  }

  async getFile(username: string) {
    let getImageRespone = await fetch(this.baseUrl + 'getProfilePic/' + username, {
      method: 'GET'
    })
    let imageName = await getImageRespone.text()

    let urlResponse = await fetch(this.baseUrl + 's3/' + imageName, {
      method: 'GET'
    });
    let signedUrl = await urlResponse.text();

    this.src = signedUrl
  }

  getUserInformation(username: string) {
    this._http.get(this.baseUrl + 'getLoggedInUser/' + username).subscribe(
      (data: User) => {
        this.user = data
      }
    )
  }

  getPosts()
  {
    this._http.get(this.baseUrl + 'getAllPosts').subscribe(
      (data: Array<Post>) => {
        this.tDatas = data
      }
    )
  }

  constructor(private _http: HttpClient, private _session: SessionService, private _toggle: AppComponent) {
    this.getFile(this._session.username)
    this.getUserInformation(this._session.username)
    this.getPosts()
  }

  togglePage() {
    this._toggle.toggleLogOut();
  }

  ngOnInit() { }
}
