import axios from 'axios';
import type { Episode, Show } from "@/types";

const TRENDING_URL = import.meta.env.VITE_TRENDING;
const SEARCH_URL = import.meta.env.VITE_SEARCH_PODCAST;
const SINGLE_FEED_URL = import.meta.env.VITE_GET_BY_ID;
const EPISODES_URL = import.meta.env.VITE_GET_EPISODE_BY_FEED;

const FAVOURITES_LS_KEY = 'favourites';

interface RequestShowsInterface {
  results: Show[]
}

interface RequestEpisodesInterface {
  results: Episode[]
}

export abstract class PodcastService {
  private static axiosInstance = axios.create();

  static async getTrendingShows(max = 6): Promise<Show[]>{
    const response = await this.axiosInstance
      .get<RequestShowsInterface>(TRENDING_URL, {
        params: {
          max
        }
      });
    return response.data.results;
  }

  static async searchShows(query: string, max = 6): Promise<Show[]>{
    const response = await this.axiosInstance
      .get<RequestShowsInterface>(SEARCH_URL, {
        params: {
          q: query,
          max
        }
      });
    return response.data.results;
  }

  static async getFeedById(feedId: number): Promise<Show>{
    const response = await this.axiosInstance
      .get(SINGLE_FEED_URL, {
        params: {
          id: feedId
        }
      });
    return response.data;
  }

  static async getEpisodesByFeedId(feedId: number, max = 6): Promise<Episode[]>{
    const response = await this.axiosInstance
      .get<RequestEpisodesInterface>(EPISODES_URL, {
        params: {
          id: feedId,
          max
        }
      });
    return response.data.results;
  }

  static addFavourite(show: Show): void {
    const currentList = this.getFavourites();
    currentList.push(show);
    localStorage.setItem(FAVOURITES_LS_KEY, JSON.stringify(currentList));
  }

  static removeFavourite(id: number): void {
    let currentList = this.getFavourites();
    currentList = currentList.filter(el => el.id !== id);
    localStorage.setItem(FAVOURITES_LS_KEY, JSON.stringify(currentList));
  }

  static getFavourites(): Show[] {
    try {
      const data: any = localStorage.getItem(FAVOURITES_LS_KEY);

      return data ? JSON.parse(data) : [];
    } catch  (error) {
      console.log(error);
      return [];
    }
  }
}

