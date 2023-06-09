import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {LocalStorageService} from "../services/local-storage.service";

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
export class AppNavComponent {
  private breakpointObserver = inject(BreakpointObserver);

  constructor(private storage: LocalStorageService) {
  }

  get countCart(): number {
    return this.storage.countCart
  }

  get countFavourites(): number {
    return this.storage.countFavourites
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
