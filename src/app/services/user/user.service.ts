import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthRequest } from 'src/app/Models/interfaces/auth/AuthRequest';
import { AuthResponse } from 'src/app/Models/interfaces/auth/AuthResponse';
import { SignupUserRequest } from 'src/app/Models/interfaces/user/SignupUserRequest';
import { SignupUserResponse } from 'src/app/Models/interfaces/user/SignupUserResponse';
import { enviroment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = enviroment.API_URL;
  constructor(private http: HttpClient , private cookie: CookieService) { }
  signupUser( requestDatas : SignupUserRequest): Observable<SignupUserResponse> {
    return this.http.post<SignupUserResponse>(
      `${this.API_URL}/user`,
      requestDatas
    );
   }
   authUser(requestDatas: AuthRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(
      `${this.API_URL}/auth`,
      requestDatas
    );
   }

   isLoggedIn(): boolean{
    //Verficar se o usuario possui um token ou cookie
    const JWT_TOKEN = this.cookie.get('USER_INFO');
    return JWT_TOKEN ? true :false;
   }
}
