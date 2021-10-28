import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnChanges {
  @Input() card: any;
  @Input() selected: boolean = false;
  @Input() matched: boolean = false;

  @Output() finishedLock: EventEmitter<boolean> = new EventEmitter();

  locked: boolean = false;

  joker: string = 'https://deckofcardsapi.com/static/img/X1.png';

  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(): void {
    if (this.selected && this.matched) {
      this.locked = true;
      this.finishedLock.emit(true);
    }
  }
}
