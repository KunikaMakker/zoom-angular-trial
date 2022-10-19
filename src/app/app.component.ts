import { Component } from '@angular/core';
import zoomSdk from "@zoom/appssdk"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'zoom-angular-trial';
  constructor() {}

  ngOnInit() {}
  
  async configureApp() {
    const configResponse = await zoomSdk.config({
      popoutSize: {width: 480, height: 360},
      capabilities: ["shareApp"]
    })
  }

  getSignature() {
    console.log("join meeting");
    this.configureApp();
    // this.startMeeting(this.signature);
  }

  // startMeeting(signature: string) {
  //   // document.getElementById("zmmtg-root").style.display = "block";

  //   ZoomMtg.init({
  //     leaveUrl: this.leaveUrl,
  //     isSupportAV: true,
  //     success: (success: any) => {
  //       console.log(success);

  //       ZoomMtg.join({
  //         signature: signature,
  //         meetingNumber: this.meetingNumber,
  //         userName: this.userName,
  //         userEmail: this.userEmail,
  //         passWord: this.passWord,
  //         success: (success: any) => {
  //           console.log(success);
  //         },
  //         error: (error: any) => {
  //           console.log(error);
  //         }
  //       });
  //     },
  //     error: (error: any) => {
  //       console.log(error);
  //     }
  //   });
  // }
}
