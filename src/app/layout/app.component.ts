import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Helper } from './../common/models/helper.model';
import { Component, ViewEncapsulation, OnInit , Inject} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
// for scroll button
  encapsulation: ViewEncapsulation.None, // ViewEncapsulation.Native may also work

  providers: [Helper]
})
export class AppComponent implements OnInit {
  name = 'Dele';
  title = 'NexTekk';

  value = 780;
 constructor(@Inject(LOCAL_STORAGE) private localStorage: any) {}


  greet() {
    alert('Hello!');
  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBUlR1VyR-64TEH2s3IASN_DqxkXxYFtws',
      authDomain: 'mompop-9c94f.firebaseapp.com'
    }
    );

       // Client only code.
    //    if (isPlatformBrowser(this.platformId)) {
    //     const item = {key1: 'value1', key2: 'valu2', key3: this_authenticateService.getToken() };
    //     localStorage.setItem( itemIndex, JSON.stringify(item) );
    //     console.log(item);
    //  }

  }

}
