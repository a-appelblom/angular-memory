import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cards: any;
  matched: boolean = false;
  first = { code: '', value: '' };
  second = { code: '', value: '' };
  bothLocked: boolean = false;

  constructor(private http: HttpClient) {}

  getSelected(card: any): boolean {
    if (this.first.code === card.code || this.second.code === card.code)
      return true;
    return false;
  }

  getColor(card: any) {
    if (card.suit === 'DIAMONDS' || card.suit === 'HEARTS') return 'red';
    return 'black';
  }

  setCards(card: any) {
    if (!this.first.code) {
      this.first = card;
    } else if (!this.second.code && card.code !== this.first.code) {
      this.second = card;
    } else if (
      this.first.value === this.second.value &&
      this.getColor(this.first) === this.getColor(this.second)
    ) {
      this.matched = true;
    } else {
      this.first = { code: '', value: '' };
      this.second = { code: '', value: '' };
    }
  }

  resetCards() {
    if (!this.bothLocked) this.bothLocked = true;
    else {
      this.first = { code: '', value: '' };
      this.second = { code: '', value: '' };
      this.bothLocked = false;
      this.matched = false;
    }
  }

  ngOnInit(): void {
    this.http
      .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .subscribe((deck: any) => {
        this.http
          .get(
            `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=52`
          )
          .subscribe((cards: any) => {
            this.cards = cards.cards;
            console.log(this.cards);
          });
      });
  }
}
