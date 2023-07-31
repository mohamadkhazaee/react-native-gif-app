export type GifType = {
  type: string;
  id: string;
  url: string;
  slug: string;
  title: string;
  rating: string;
  images: {
    original: {
      height: string;
      width: string;
      url: string;
    };
  };
};

export type FetchRandomGif = {
  data: GifType;
};

export type PaginationType = {
  offset: number;
  total_count: number;
  count: number;
};

export type SearchGifParams = {
  query: string;
  offset: number;
};

export type SearchGif = {
  response: { data: GifType[]; pagination: PaginationType };
  params: SearchGifParams;
};
