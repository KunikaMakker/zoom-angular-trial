import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})

export class ZoomApiService {
    constructor(private http: HttpClient) { }

    getUserDetails(url: string, options?: any) {
        return this.http.get(url);
    }
}