import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TherapistService {
    constructor(private http:Http){
        console.log('Task Service Initialized...');
    }

    getTherapists(){
        return this.http.get('http://localhost:3000/api/therapists')
        .map(res => res.json());
    }
}