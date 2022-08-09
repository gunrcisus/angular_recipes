import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError ,tap } from "rxjs/operators";
import { User } from "./user.model";


export interface AuthResponseData{
    kind :string ;
    idToken : string;
    email : string;
    refreshToken : string;
    expiresIn : string;
    localId : string;
    registered?:boolean;
}

@Injectable({providedIn:'root'})
export class AuthService{

    //gives subscribers immediate access to the prev emitted value even if they haven't subscribed at the point of time the value was emitted
    //that means we can get access to the currently active user even if we only subscribe after that user has been emitted
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer : any;

    constructor(private http: HttpClient , private router : Router){}


    signup(email:string , password:string){
       return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCnN0qfz4CIwb--G-Ynmo-2czQHx3KAzEM',
            {email :email , password : password ,returnSecureToken: true}
            ).pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(resData.email ,
                         resData.localId ,
                          resData.idToken , 
                          +resData.expiresIn) 
            }));
    }

    login(email:string , password:string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCnN0qfz4CIwb--G-Ynmo-2czQHx3KAzEM',
            {email :email , password : password ,returnSecureToken: true} )
            .pipe(catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(resData.email ,
                     resData.localId ,
                      resData.idToken , 
                      +resData.expiresIn) 
        }));
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration : number){
        console.log(expirationDuration);
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);

    }

    autoLogin(){
        const userData:{
            email:string ,
            id:string ,
            _token:string ,
            _tokenExpirationDate : string
        } =JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        const loadedUser = new User(userData.email , userData.id , userData._token ,new Date(userData._tokenExpirationDate) );

        if(loadedUser.token){
            
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();

            this.autoLogout(expirationDuration);
        }
    }

    private handleAuthentication(email : string ,userId:string , token :string , expiresIn : number){

        const expirationDate = new Date(new Date().getTime()+ expiresIn * 1000);

        const user = new User(email , userId , token , expirationDate);

        this.user.next(user);

        this.autoLogout(expiresIn * 1000);

        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes:HttpErrorResponse){
        let errorMessgae = 'An Unknown error occured!';
                if(!errorRes.error || !errorRes.error.error){
                    return throwError(errorMessgae);
                }
                switch(errorRes.error.error.message){
                    case 'EMAIL_EXISTS':
                        errorMessgae = 'This email exists already';
                        break;
                    case 'EMAIL_NOT_FOUND':
                        errorMessgae = 'This email does not found';
                        break;
                    case 'INVALID_PASSWORD' :
                        errorMessgae = 'The password is incorrect';
                        break;  
                    case 'USER_DISABLED' :
                        errorMessgae = 'This user is disabled';
                        break;      
                }   
                return throwError(errorMessgae);
    }

}