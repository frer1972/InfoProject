import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { SessionService } from '../session.service';
import { User } from '../user';
import { SelectedUserService } from '../selected-user.service';
import { RoutingService } from '../routing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-friend',
  templateUrl: './search-friend.component.html',
  styleUrls: ['./search-friend.component.css']
})
export class SearchFriendComponent implements OnInit {

  baseUrl: string = "http://localhost:9005/Project2Spring/api/"

  src: string = "../../assets/user.png"

  user: User
  
  myresponse: Array<User>; 
  myresp: Array<User>;
  
  APP_URL = 'http://localhost:9005/Project2Spring/api/';

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
    this.getFile(this._session.username)
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

  async getFile(username: string)
  {
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

  constructor(private _http: HttpClient, private _session: SessionService, private _toggle: AppComponent, 
    private _selectedUser: SelectedUserService, private _router: Router) { 
    
    this.getFile(this._session.username)
    this.getUserInformation(this._session.username) 

    this._http.get(this.APP_URL + 'getUsers').subscribe(
      (data: Array<User>) => {
        this.myresponse = data;
        this.myresp = this.myresponse;
      },
      error => {
        console.log('Error occured', error);
      }
    )
  }
  
  searchTable() {    
    let input, filter, table, tr, td, tdl, i, txtValue, txtValuel;
    input = document.querySelector("#myInput");
    filter = input.value.toLowerCase();
    table = document.querySelector("#myTable");
    tr = table.querySelectorAll("tr");
    
    for (i = 0; i < tr.length; i++) {
        td = tr[i].querySelectorAll("td")[0];
        tdl = tr[i].querySelector("#tdl");
        if (td || tdl) {
            txtValue = td.textContent || td.innerText;
            txtValuel = tdl.textContent || tdl.innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1 || txtValuel.toLowerCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        } 
    }
  }

  viewProfile(user: User)
  {
    this._selectedUser.selectedUser = user
    this._router.navigate(['app-friend-profile'])
  }

  ngOnInit() { }
}
