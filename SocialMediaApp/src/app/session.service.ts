import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  username: string

  constructor() { }

  getUsername(): string
  {
    return this.username
  }

  setUsername(name: string)
  {
    this.username = name
  }
}
