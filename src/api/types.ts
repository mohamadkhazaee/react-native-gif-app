// TODO: improve typing
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
