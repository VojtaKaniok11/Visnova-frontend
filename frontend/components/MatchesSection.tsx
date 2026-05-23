import { fetchAPI } from '@/lib/strapi';
import MatchList from './MatchList';

interface Match {
  id: number;
  Opponent: string;
  Date: string;
  IsHomeGame: boolean;
  Score?: string | null;
  Team?: string;
}

async function getMatches(): Promise<Match[]> {
  try {
    const matchesRes = await fetchAPI('/matches', {
      'populate': '*',
      'sort[0]': 'Date:desc',
      'pagination[pageSize]': 100,
    });
    return matchesRes.data || [];
  } catch (error) {
    console.error('Error fetching matches', error);
    return [];
  }
}

export async function MatchesSectionUpcoming() {
  const matches = await getMatches();
  return (
    <div className="mb-20">
      <MatchList matches={matches} show="upcoming" />
    </div>
  );
}

export async function MatchesSectionPast() {
  const matches = await getMatches();
  return (
    <div className="lg:col-span-1">
      <MatchList matches={matches} show="past" />
    </div>
  );
}
