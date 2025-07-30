import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginReponse } from '../types/loginResponse.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

login(email: string, password: string) {
  return this.httpClient.post<LoginReponse>("/login", { email, password }).pipe(
    tap((value) => {
      sessionStorage.setItem("auth-token", value.token);
      sessionStorage.setItem("auth-username", value.name);
    })
  );
}

}
