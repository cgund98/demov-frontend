export interface CreatePartyRequest {
  genres: string[];
  minYear: number;
  maxYear: number;
  minRating: number;
  maxSwipes: number;
}

export type PartyStatus = 'waiting' | 'active';

export interface Party {
  partyId: string;
  joinCode: string; // secondary code that a user can use to join the party
  ownerId: string; // id of the user that created the party
  creationTime: number; // when the party was created (unix)
  lastModified: number; // last time the party object was modified (unix)
  status: PartyStatus; // can be one of ('waiting', 'active')
}

export type CreatePartyResponse = Party;
