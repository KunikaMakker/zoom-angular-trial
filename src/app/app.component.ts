import { Component } from '@angular/core';
import zoomSdk from "@zoom/appssdk"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'zoom-angular-trial';
  value: any = "";
  currencies = { code: 'ALL', name: 'Albanian lek', symbol: 'L' }
  constructor() {}

  ngOnInit() {}
  
  async configureApp() {
    try {
      const configResponse = await zoomSdk.config({
          size: { width: 480, height: 360 },
          capabilities: [
              /* Add Capabilities Here */
              'shareApp',
          ],
      });
      this.value=configResponse
      console.debug('Zoom JS SDK Configuration', configResponse);
    } catch (e) {
      this.value="error"
        console.error(e);
    }
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
