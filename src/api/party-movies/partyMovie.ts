export interface PartyMovie {
  partyId: string;
  movieId: string;
  score: number;
}

export type ListPartyMoviesResponse = PartyMovie[];
export type VotePartyMovieResponse = PartyMovie;
