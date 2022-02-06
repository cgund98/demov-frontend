export interface Member {
  partyId: string;
  memberId: string;
  joinTime: number;
  name: string;
  swiped: number;
}

export type GetPartyMembersResponse = Member[];
