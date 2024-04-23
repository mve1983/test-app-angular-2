import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayformComponent } from './playform/playform.component';
import { GameComponent } from './game/game.component';
import { HeaderComponent } from './header/header.component';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PlayformComponent, GameComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly gameService: GameService = inject(GameService);

  ngOnInit(): void {
    this.gameService.getGameToken(true);
    this.gameService.getGameCategories(true);
  }

  protected scrollTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
