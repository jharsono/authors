import { Component } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // authors: {authors:[{name:""}]};
  // constructor(private _httpService: HttpService){ }
  // ngOnInit(){
  //   this.getAuthorsFromService();
  //   }
  // getAuthorsFromService(){ // define the function to get an observable and subscribe
  //   let observable = this._httpService.getAllAuthors(); //getAllAuthors is invoked from http.service
  //   observable.subscribe(data => {
  //       console.log("Got our data!", data);
  //       this.authors = data; //put data into products objects
  //     }); // subscribe
  //   }
    // getProduct(id) {
    //   console.log(id);
    //   this._httpService.getProduct(id); //getProduct is invoked from http.service
    //   }

}
