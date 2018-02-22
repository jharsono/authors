import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-show-quotes',
  templateUrl: './show-quotes.component.html',
  styleUrls: ['./show-quotes.component.css']
})
export class ShowQuotesComponent implements OnInit {
  author: any;
  quotes = [];
  params: any;

  constructor(private _httpService: HttpService, private route: ActivatedRoute) {
      this.route.params.subscribe( params => this.params = params);
  }

  ngOnInit() {
    this.author = {}
    this.getOneAuthor();
  }

  getOneAuthor() {
    console.log("id", this.params.id)
      let observable = this._httpService.getOneAuthor(this.params.id);
      observable.subscribe(data => {
          console.log(data);
          this.author = data;
          this.quotes = this.author.quotes;
      });
  }

  deleteQuote(i) {
    let observable = this._httpService.deleteQuote(this.params.id, i);
    observable.subscribe(data => {
        console.log(data);
        if (!data.hasOwnProperty('success')) {

        } else {
            this.getOneAuthor();
        }
    });
  }

  upvoteQuote(index, quote) {
        quote.index = index;
        let observable = this._httpService.upvoteQuote(this.params.id, quote);
        observable.subscribe(data => {
            console.log(data);
            if (!data.hasOwnProperty('success')) {
                //error handing
            } else {
                this.getOneAuthor();
            }
        });
    }

    downvoteQuote(index, quote) {
        quote.index = index;
        let observable = this._httpService.downvoteQuote(this.params.id, quote);
        observable.subscribe(data => {
            console.log(data);
            if (!data.hasOwnProperty('success')) {
                //error handing
            } else {
                this.getOneAuthor();
            }
        });
    }
}
