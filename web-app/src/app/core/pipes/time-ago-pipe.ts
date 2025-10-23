import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appTimeAgo',
  standalone: false
})
export class TimeAgoPipe implements PipeTransform {
  public transform(value: Date): string {
    const date = new Date(value);
    const currentTime = new Date();
    var seconds = Math.floor((currentTime.getTime() - date.getTime()) / 1000);

    var interval = seconds / 31536000;
    if (interval > 1) {
      return `${Math.floor(interval)} years ago`;
    }

    interval = seconds / 2592000;
    if (interval > 1) {
      return `${Math.floor(interval)} months ago`;
    }

    interval = seconds / 86400;
    if (interval > 1) {
      return `${Math.floor(interval)} days ago`;
    }

    interval = seconds / 3600;
    if (interval > 1) {
      return `${Math.floor(interval)} hours ago`;
    }

    interval = seconds / 60;
    if (interval > 1) {
      return `${Math.floor(interval)} minutes ago`;
    }
    
    return `${Math.floor(seconds)} seconds ago`;
  }
}
