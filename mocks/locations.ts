import { ILocation } from "@/types";

const locations: ILocation[] = [
  // Kitchen Floor
  { id: 1, title: 'Sandwich Station', floor: 'kitchen' },
  { id: 2, title: 'Bread & Salad Station', floor: 'kitchen' },
  { id: 3, title: 'Kitchen Fridge', floor: 'kitchen' },
  { id: 4, title: "Chef's Station", floor: 'kitchen' },
  { id: 5, title: 'Fryer Station', floor: 'kitchen' },
  { id: 6, title: 'Dishwashing Station', floor: 'kitchen' },

  // Stock Floor (Storage Room)
  { id: 7, title: 'Storage Fridge', floor: 'stock' },
  { id: 8, title: 'Storage Freezer', floor: 'stock' },
  { id: 9, title: 'Hallway', floor: 'stock' },
  { id: 10, title: 'Storage Room', floor: 'stock' }
];

export default locations
