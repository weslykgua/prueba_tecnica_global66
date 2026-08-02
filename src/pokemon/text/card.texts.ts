const CardTexts = {
  viewDetailAria: (name: string) => `Ver detalle de ${name}`,
  favoriteAria: (isFav: boolean) =>
    isFav ? 'Eliminar de favoritos' : 'Marcar como favorito',
  removeFavoriteLabel: 'Eliminar de favoritos',
};

export default CardTexts;
