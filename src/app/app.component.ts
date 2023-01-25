import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import zoomSdk from "@zoom/appssdk"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnChanges{
  title = 'zoom-angular-trial';
  value: any = "";
  userDetails: any = "";
  meetingDetails: any = "";
  allParticipants: any = [];
  newParticipant: any = [];
  // currencies = { code: 'ALL', name: 'Albanian lek', symbol: 'L' }
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    zoomSdk.onParticipantChange((event: any) => {
      this.newParticipant = event;
      console.log('participantchange',event)
    });
  }

  ngOnInit() {
    if(this.isRunningInZoom()) {
      console.log("running in zoom")
      this.getSignature();
    }
  }

  isRunningInZoom() {
    return (
      typeof window !== 'undefined' &&
      window.navigator.userAgent.includes('ZoomWebKit')
    );
  }
  
  async configureApp() {
    try {
      const configResponse = await zoomSdk.config({
          size: { width: 480, height: 360 },
          capabilities: [
              /* Add Capabilities Here */
              "shareApp",
              "getMeetingContext",
              "getUserContext",
              "getMeetingParticipants",
              "onParticipantChange"
          ],
      });
      this.value=configResponse
      console.log('Zoom JS SDK Configuration', configResponse);
      // this.shareApp(); //screen share
      this.getMeetingDetails();
      this.getUserDetails();
      this.getAllParticipants();
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

  getUserDetails() {
    zoomSdk.getUserContext().then((result: any) => {
      console.log('users', result);
      this.userDetails = result;
      // e.g. { screenName: 'Happy Zoomineer', role: 'host', participantId: "xxxx", participantUUID: "xxxx", status: "authorized"}
    })
    .catch(function(error: any){
      console.log(error);
      // there was an error
    })  
  }
  async shareApp() {
    await zoomSdk.shareApp({ action: "start" });
    console.log('shareapp');
  }
  async getMeetingDetails() {
    const meeting = await zoomSdk.getMeetingContext();
    this.meetingDetails = meeting;
    console.log('meeting details', meeting);
  }
  async getAllParticipants() {
    const allParticipants = await zoomSdk.getMeetingParticipants();
    this.allParticipants = allParticipants;
    console.log('all', allParticipants);
  }
  setAuthenticationListeners() {
    console.log('In-Client OAuth flow: onAuthorized event listener added');
    zoomSdk.addEventListener('onAuthorized', (event) => {
      const { code } = event;
      console.log('3. onAuthorized event fired.');
      console.log(
        '3a. Here is the event passed to event listener callback, with code and state: ',
        event
      );
      console.log(
        '4. POST the code, state to backend to exchange server-side for a token.  Refer to backend logs now . . .'
      );
    });

    zoomSdk.addEventListener('onMyUserContextChange', (event) => {
      console.log('onMyUserContextChange', event);
    });
  }
}
