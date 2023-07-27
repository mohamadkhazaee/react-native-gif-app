// TODO: improve typing
export type RandomGif = {
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
