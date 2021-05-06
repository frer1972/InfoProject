import { Component } from '@angular/core';
import { RoutingService } from './routing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newUser = {
    username: '',
    password: ''
  }
  isOn: Boolean = true;

  constructor(private routingService: RoutingService, private router: Router) {
    routingService.changeEmitted$.subscribe(
      text => {
        this.isOn = false
        this.router.navigate([text])
      }
    )
  }

  toggleLogOut() {
    if (!this.isOn) this.isOn = true;
  }

  title = 'SocialMediaApp';
}
