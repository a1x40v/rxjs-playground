import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { exhaustMap, fromEvent, mergeMap, takeUntil, timer } from 'rxjs';
import { Character } from './rick-and-morty.model';

@Component({
  selector: 'app-rick-and-morty',
  standalone: true,
  imports: [],
  templateUrl: './rick-and-morty.component.html',
  styleUrl: './rick-and-morty.component.css',
})
export class RickAndMortyComponent implements AfterViewInit {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private charactedId = 1;
  character?: Character;

  @ViewChild('buttonStart') buttonStart!: ElementRef<HTMLButtonElement>;
  @ViewChild('buttonStop') buttonStop!: ElementRef<HTMLButtonElement>;

  ngAfterViewInit(): void {
    const clickStart$ = fromEvent(this.buttonStart.nativeElement, 'click');
    const clickStop$ = fromEvent(this.buttonStop.nativeElement, 'click');
    const timer$ = timer(0, 3000);

    const sub = clickStart$
      .pipe(
        exhaustMap(() => timer$.pipe(takeUntil(clickStop$))),
        mergeMap(() => this.getCharacterObservable())
      )
      .subscribe((character) => {
        this.character = character;
      });

    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  private getCharacterObservable() {
    if (this.charactedId > 10) {
      this.charactedId = 1;
    }

    return this.httpClient.get<Character>(
      `https://rickandmortyapi.com/api/character/${this.charactedId++}`
    );
  }
}
