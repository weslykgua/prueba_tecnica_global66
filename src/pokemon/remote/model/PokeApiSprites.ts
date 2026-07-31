export default interface PokeApiSprites {
  front_default: string | undefined;
  other?: {
    'official-artwork'?: {
      front_default: string | undefined;
    };
    home?: {
      front_default: string | undefined;
    };
  };
}