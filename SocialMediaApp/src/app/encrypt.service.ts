import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  constructor() { }

  hash(value: string): string
  {
    let hashedValue: string = CryptoJS.MD5(value).toString()

    return hashedValue
  }

}
