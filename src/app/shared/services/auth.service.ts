import { Injectable } from '@angular/core';
import { getLastEvent, onEvent } from '@fiap-pos-front-end/fiap-tc-shared';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token = '';
  getToken() {
    this.token = getLastEvent('jwtToken');
    console.log('🚀 ~ AuthService ~ getToken ~ this.token:', this.token);
    return this.token;
  }
}
