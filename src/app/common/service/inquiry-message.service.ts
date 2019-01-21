import { Injectable } from '@angular/core';
import { Inquiry } from '../models/inquiry.model';
import { ContactService } from '../../terms/contact-us/contact.service';
import { Http, Headers } from '@angular/http';

@Injectable()
export class InquiryMesssageService {

    constructor( private _contactService: ContactService, private http: Http) {}
    storeInquiry() {

        const header = new Headers({'Content-Type': 'application.json'});

        // post data
    //    return this.http.post('https://mompopcheck.firebaseio.com/inquiry.json?' ,
    //     this._contactService.getInquiries()
    //     , {headers: header}
    // );

    // put data
    return this.http.post('https://mompop-9c94f.firebaseio.com/inquiry.json?' ,
        this._contactService.getInquiries()
        , {headers: header}
    );
    }
}
