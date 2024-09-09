import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // the state of the component & methods which maniupulate this state
  newMemberName = '';
  members: string[] = [];
  errorMessage = '';
  numberOfTeams: '' | number = '';
  teams: string[][] = []; // array of arrays of strings

  onInput(value: string) {
    this.newMemberName = value;
  }

  add() {
    if (!this.newMemberName) {
      this.errorMessage = "Name can't be empty!";
      return;
    }
    this.errorMessage = '';
    this.members.push(this.newMemberName);
    this.newMemberName = '';
  }

  onNumberOfTeamsInput(value: string) {
    this.numberOfTeams = Number(value);
  }

  generateTeams() {
    if (!this.numberOfTeams || this.numberOfTeams <= 0) {
      this.errorMessage = 'You cannot divide people into 0 or less... teams!';
      return;
    }

    if (this.members.length < this.numberOfTeams) {
      this.errorMessage = 'Not enough members';
      return;
    }
    const allMembers = [...this.members];
    while (allMembers.length) {
      for (let i = 0; i < this.numberOfTeams; i++) {
        const randomIndex = Math.floor(Math.random() * allMembers.length);
        const member = allMembers.splice(randomIndex, 1)[0];
        if (!member) break;

        if (this.teams[i]) {
          this.teams[i].push(member);
        } else {
          this.teams[i] = [member];
        }

        console.log(this.teams);
      }
    }
    this.members = [];
    this.numberOfTeams = '';
  }
}
