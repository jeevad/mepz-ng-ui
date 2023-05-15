import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRooms',
})
export class FilterRoomsPipe implements PipeTransform {
  transform(rooms: any[], searchTerm: string): any[] {
    if (!searchTerm) {
      return rooms;
    }

    return rooms.filter((room) => {
      return room.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }
}
