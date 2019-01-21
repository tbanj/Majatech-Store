import { ProductFireService } from './../../common/service/productfire.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild,  OnDestroy } from '@angular/core';
import * as dem from './../../../assets/js/main';
import { Inquiry } from '../../common/models/inquiry.model';
import { ContactService } from './contact.service';
import { InquiryMesssageService } from '../../common/service/inquiry-message.service';

import { Response } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  providers: [ContactService, InquiryMesssageService],
})
export class ContactUsComponent implements OnInit, OnDestroy {
   @ViewChild('contactForm') inquiryForm: NgForm;
nm: Inquiry;
idCheck: string;

storeInquiryClean: Subscription;

//  newInquiry: Inquiry[];

  constructor(private _contactService: ContactService, private _productFireService: ProductFireService,
    private _inquiryMessageService: InquiryMesssageService, private toastr: ToastrService) {
    // this.newInquiry= [] ;
   }

  ngOnInit() {
    this.idCheck = 'contact';
    this._productFireService.urlCheckCarousel.next(this.idCheck);
  }

  contactSubmit(form: NgForm) {
    // use to extract the data from the form
    const value = form.value;
    const newInquiry = new Inquiry(value.name, value.email, value.subject, value.message);

    this._contactService.addInquiry(newInquiry);

    // send data to firebase
    this.storeInquiryClean = this._inquiryMessageService.storeInquiry().subscribe(
        (response: Response) => {
          // this._contactService.getInquiries();
          this.toastr.success('Thank you, you will recieve a response soon.');
           },
        (error: any) => {
          this.toastr.error(error);
          this.storeInquiryClean = this._inquiryMessageService.storeInquiry().subscribe();
         }
      );

    // clear form
    this.inquiryForm.reset();

  }

    ngOnDestroy() {
      // this.storeInquiryClean.unsubscribe();
    }

}
