export interface IVaction {
  vacation_id: number;
  user_id: string|null;
  destination: string;
  description:string;
  picture: string;
  startDate: string;
  endDate: string;
  price: number;
  numOfFollowers: number;
  children?:any
}

