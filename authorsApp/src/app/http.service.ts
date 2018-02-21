import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private _http: HttpClient) { }
  authorId: any;
    getAllAuthors(){
     // our http response is an Observable, store it in a variable
     // let tempObservable = this._http.get('/tasks');
     // // subscribe to the Observable and provide the code we would like to do with our data from the response
     // tempObservable.subscribe(data => console.log("Got our tasks!", data));
     return this._http.get('/show-all');
   }
   delete(id) {
     console.log("about to delete author:", id);
     return this._http.delete(`/delete/${id}`);
   }
   new(author) {
     return this._http.post('/new', author);
   }

   getAuthor(id){
     console.log("author id:", id);
     console.log("now in the service");
     this.authorId = id;

     console.log("author:", this.authorId)

   }

   returnAuthor(){
     return this._http.get(`/authors/${this.authorId}`);
   }
   update(author){
     console.log("about to edit: ", this.authorId)
     return this._http.put(`/update/${this.authorId}`, author);
   }
}
