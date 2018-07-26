import { Component, OnInit } from '@angular/core';

import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  constructor(private userService: UserService) { }

  users: User[];
  friends: User[];

  ngOnInit() {
  	this.friends = [];
  	this.getUsers();
  }

  getUsers() {
  	let user:User = JSON.parse(sessionStorage.getItem('user'));
  	if (!user || !user.id) {
  		return;
  	}
  	this.userService.getUsers().subscribe(_json => {
  		this.users = _json;
  		this.userService.getFriendIds(user.id).subscribe(_data => {
  			let friendIds: String[] = _data;
  			for (let i = 0; i < this.users.length; i++) {
	  			if (friendIds.includes(this.users[i].id)) {
	  				this.friends.push(this.users.splice(i, 1)[0]);
	  				i--;
	  			}
	  		}

	  		console.log(this.friends);
  		});
  	});
  }

}
