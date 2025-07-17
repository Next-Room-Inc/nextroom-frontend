export interface Amenity {
  label?: string;
  icon?: string;
  alt?: string;
}

// eslint-disable-next-line 
export interface PropertyDetails extends  Floorplan {

}
// eslint-disable-next-line 
export interface Property  extends Unit {
  propertyName?:string
  structureType?:string
}


export interface EntrataProperty {
  propertyName?: string;
  address?: string;
  structureType?: string;
  shortDescription?: string;
  longDescription?: string;
  petPolicy?: string;
  amenities?: Amenity[];
  floorplans?: Floorplan[];
}

export interface Amenity {
  amenityId?: number;
  name?: string;
  standardName?: string;
  type?: string;
  description?: string;
}

export interface Floorplan {
  id?: number;
  name?: string;
  description?: string | null;
  applyNowLink?: string | null;
  availabilityUri?: string | null;
  bedrooms?: number;
  bathrooms?: number;
  sqFeetMin?: number | null;
  sqFeetMax?: number | null;
  rentMin?: number;
  rentMax?: number;
  depositMin?: number | null;
  depositMax?: number | null;
  availableUnitsCount?: number | null;
  isWaitlist?: boolean | null;
  availableUnits?: AvailableUnits | null;
  photos?: unknown; // You can define this if needed
  videos?: unknown; // Same as above
  tourPhotos?: unknown; // Same as above
}

export interface AvailableUnits {
  unit?: Unit[];
}

export interface Unit {
  unitNumber?: string;
  marketingNumber?: string | null;
  unitId?: number | null;
  unitTypeId?: number | null;
  unitSpaceId?: number | null;
  sqFeet?: number | null;
  rentMin?: number;
  rentMax?: number;
  depositMin?: number | null;
  depositMax?: number | null;
  availableOn?: string;
  unitFurnished?: string;
  applyNowLink?: string | null;
  location?: Location;
  photos?: Photo[] | null;
  tourPhotos?: unknown; // Define as needed
  videos?: unknown; // Define as needed
}

export interface Location {
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal?: string;
}

export interface Photo {
  uri?: string;
  title?: string;
  caption?: string;
  width?: number;
  height?: number;
}
