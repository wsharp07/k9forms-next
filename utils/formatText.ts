export const getAlteredText = (altered: string, gender: string) => {
  if (!altered || !gender) return '';

  let isAltered = altered.toLowerCase() === 'yes';

  if (isAltered && gender.toLowerCase() === 'female') {
      return '(Spayed)';
  }

  if (isAltered && gender.toLowerCase() === 'male') {
      return '(Neutered)';
  }

  return '';
}