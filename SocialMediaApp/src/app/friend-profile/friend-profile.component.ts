import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { SessionService } from '../session.service';
import { User } from '../user';
import { Post } from '../post';
import { SelectedUserService } from '../selected-user.service';

@Component({
  selector: 'app-friend-profile',
  templateUrl: './friend-profile.component.html',
  styleUrls: ['./friend-profile.component.css']
})
export class FriendProfileComponent implements OnInit {

  tData: string;
  tDatas: Array<Post> = []

  baseUrl: string = "http://localhost:9005/Project2Spring/api/"

  src: string = "../../assets/user.png"

  user: User

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
        for(let i = 0; i < data.length; i++)
        {
          if(data[i].owner.userName == this._selected.selectedUser.userName)
          {
            this.tDatas.push(data[i])
          }
        } 
      }
    )
  }

  constructor(private _http: HttpClient, private _selected: SelectedUserService, private _toggle: AppComponent) {
    this.getFile(this._selected.selectedUser.userName)
    this.getUserInformation(this._selected.selectedUser.userName)
    this.getPosts()
    console.log("")
  }

  togglePage() {
    this._toggle.toggleLogOut();
  }

  ngOnInit() {
  }

}
