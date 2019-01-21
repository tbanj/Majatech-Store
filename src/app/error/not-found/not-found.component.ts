import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit, OnDestroy {
  errorMessage;
  dataSubscription: Subscription;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.dataSubscription = this.activatedRoute.data.subscribe((data: Data) => {
      this.errorMessage = data['message'];
    });
  }

  ngOnDestroy() {
        this.dataSubscription.unsubscribe();
        
    }

}
