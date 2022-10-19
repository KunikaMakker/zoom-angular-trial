import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ZoomMtg } from "@zoomus/websdk";

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'zoom-angular-trial';
  // update these
  signature: string =
    "ZFZGdXFUSDRUbHlXV3kxcnQxUTVody45NTA2NzU5MDUxMS4xNjA2MTIxNDYzNzcwLjEuN0oxWHBDTE1uUHh2aW1JQ3I0bUdFSThPRnlGbVVFN2ZoRERrT3dLcHByVT0";
  apiKey: string = "dVFuqTH4TlyWWy1rt1Q5hw";
  meetingNumber: string = "95067590511";
  role: number = 1;
  leaveUrl: string = "http://localhost:4200";
  userName: string = "Kunika";
  userEmail:string = "kunika.makker@shl.com";
  passWord = "";

  constructor(public httpClient: HttpClient) {}

  ngOnInit() {}

  getSignature() {
    console.log("join meeting");

    this.startMeeting(this.signature);
  }

  startMeeting(signature: string) {
    // document.getElementById("zmmtg-root").style.display = "block";

    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      isSupportAV: true,
      success: (success: any) => {
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          meetingNumber: this.meetingNumber,
          userName: this.userName,
          userEmail: this.userEmail,
          passWord: this.passWord,
          success: (success: any) => {
            console.log(success);
          },
          error: (error: any) => {
            console.log(error);
          }
        });
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
