import { Location } from "./Location";

export type Address = {
  full_address: string;
  location: Location | null;
};
