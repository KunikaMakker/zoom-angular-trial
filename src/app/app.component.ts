import { Component, OnInit } from '@angular/core';
import { ZoomApiService } from './Services/zoomApiService';

export class AppComponent implements OnInit{
  title = 'zoom-angular-trial';

  data: any = "hey";

  constructor(private zoom: ZoomApiService) {}

  ngOnInit() {
    // this.zoom.getUserDetails('https://api.zoom.us/v2/users/kunika.makker@shl.com').subscribe((res) => {
    //   console.log(res)
    //   alert(res)
    //   this.data = JSON.stringify(res);
    this.getUser()
    // })
  }

 async getUser() {
  const response = await fetch(" https://api.zoom.us/v2/users/615705");
        if (response.status !== 200) throw new Error();
        const user = await response.json();
        console.log(user)
  
 }
}
