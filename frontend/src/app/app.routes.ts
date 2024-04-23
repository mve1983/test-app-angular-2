import { Routes } from '@angular/router';
import { PlayformComponent } from './playform/playform.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'play', component: PlayformComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'game', component: GameComponent },
  { path: '**', redirectTo: '/' },
];
