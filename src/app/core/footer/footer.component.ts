import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  // for scroll button
  // encapsulation: ViewEncapsulation.None, // ViewEncapsulation.Native may also work
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
