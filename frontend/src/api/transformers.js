export const extractCollection = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

export const extractEntity = (payload, key) => {
  if (payload?.[key]) return payload[key];
  return payload;
};

const splitName = (fullName = '') => {
  const parts = String(fullName).trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) {
    return { firstName: parts[0] || '', lastName: '' };
  }
  return {
    firstName: parts.slice(0, -1).join(' '),
    lastName: parts[parts.length - 1],
  };
};

export const ownerFromApi = (owner) => {
  const { firstName, lastName } = splitName(owner?.fullName);
  return {
    id: owner?.id,
    fullName: owner?.fullName || '',
    firstName,
    lastName,
    phone: owner?.telephone || '',
    telephone: owner?.telephone || '',
    email: owner?.email || '',
    address: owner?.adresse || '',
    adresse: owner?.adresse || '',
    city: owner?.ville || '',
    ville: owner?.ville || '',
  };
};

export const ownerToApi = (owner) => {
  const combinedFullName = [owner?.firstName, owner?.lastName].filter(Boolean).join(' ').trim();
  return {
    fullName: owner?.fullName || combinedFullName,
    telephone: owner?.telephone || owner?.phone || '',
    email: owner?.email || null,
    adresse: owner?.adresse || owner?.address || '',
    ville: owner?.ville || owner?.city || '',
  };
};

export const animalFromApi = (animal) => ({
  id: animal?.id,
  ownerId: animal?.owner_id ?? '',
  owner_id: animal?.owner_id ?? '',
  name: animal?.nom || '',
  nom: animal?.nom || '',
  species: animal?.espece || '',
  espece: animal?.espece || '',
  breed: animal?.race || '',
  race: animal?.race || '',
  birthDate: animal?.date_naissance || '',
  date_naissance: animal?.date_naissance || '',
  sex: animal?.sexe || '',
  sexe: animal?.sexe || '',
  identificationNumber: animal?.numero_identification || '',
  numero_identification: animal?.numero_identification || '',
});

export const animalToApi = (animal) => ({
  owner_id: Number(animal?.ownerId || animal?.owner_id),
  nom: animal?.nom || animal?.name || '',
  espece: animal?.espece || animal?.species || '',
  race: animal?.race || animal?.breed || '',
  date_naissance: animal?.date_naissance || animal?.birthDate || '',
  sexe: animal?.sexe || animal?.sex || 'male',
  numero_identification: animal?.numero_identification || animal?.identificationNumber || null,
});

export const consultationFromApi = (consultation) => ({
  id: consultation?.id,
  animalId: consultation?.animal_id ?? '',
  animal_id: consultation?.animal_id ?? '',
  date: consultation?.date_consultation ? String(consultation.date_consultation).slice(0, 10) : '',
  dateTime: consultation?.date_consultation || '',
  reason: consultation?.motif || '',
  motif: consultation?.motif || '',
  diagnosis: consultation?.diagnostic || '',
  diagnostic: consultation?.diagnostic || '',
  treatment: consultation?.traitement || '',
  traitement: consultation?.traitement || '',
  notes: consultation?.notes || '',
});

export const consultationToApi = (consultation) => ({
  animal_id: Number(consultation?.animalId || consultation?.animal_id),
  date_consultation: consultation?.dateTime || consultation?.date || '',
  motif: consultation?.motif || consultation?.reason || '',
  diagnostic: consultation?.diagnostic || consultation?.diagnosis || null,
  traitement: consultation?.traitement || consultation?.treatment || null,
  notes: consultation?.notes || null,
});

export const documentFromApi = (document, apiOrigin) => ({
  id: document?.id,
  consultationId: document?.consultation_id ?? '',
  consultation_id: document?.consultation_id ?? '',
  name: document?.nom_fichier || '',
  nom_fichier: document?.nom_fichier || '',
  type: document?.type || '',
  size: document?.taille ?? 0,
  notes: document?.notes || '',
  uploadDate: document?.created_at ? String(document.created_at).slice(0, 10) : '',
  url: document?.chemin ? `${apiOrigin}/storage/${document.chemin}` : '',
});
