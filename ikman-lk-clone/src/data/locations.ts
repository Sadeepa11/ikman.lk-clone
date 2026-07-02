import type { Location } from '../types';

export const locations: Location[] = [
  { id: 'colombo', district: 'Colombo', cities: ['Colombo 1', 'Colombo 2', 'Colombo 3', 'Colombo 4', 'Colombo 5', 'Colombo 6', 'Colombo 7', 'Colombo 10', 'Battaramulla', 'Dehiwala', 'Maharagama', 'Moratuwa', 'Mount Lavinia', 'Nugegoda', 'Rajagiriya', 'Ratmalana', 'Wellampitiya', 'Borella', 'Kelaniya', 'Kaduwela', 'Malabe', 'Kottawa', 'Piliyandala', 'Thalawathugoda', 'Sri Jayawardenepura Kotte'] },
  { id: 'gampaha', district: 'Gampaha', cities: ['Gampaha', 'Negombo', 'Ja-Ela', 'Wattala', 'Ragama', 'Kadawatha', 'Kiribathgoda', 'Delgoda', 'Minuwangoda', 'Katunayake', 'Nittambuwa', 'Mirigama', 'Veyangoda', 'Divulapitiya', 'Dompe'] },
  { id: 'kalutara', district: 'Kalutara', cities: ['Kalutara', 'Panadura', 'Horana', 'Beruwala', 'Aluthgama', 'Matugama', 'Bandaragama', 'Wadduwa', 'Ingiriya', 'Palindanuwara'] },
  { id: 'kandy', district: 'Kandy', cities: ['Kandy', 'Peradeniya', 'Katugastota', 'Gampola', 'Nawalapitiya', 'Pilimatalawa', 'Kundasale', 'Akurana', 'Wattegama', 'Digana', 'Gelioya'] },
  { id: 'matale', district: 'Matale', cities: ['Matale', 'Dambulla', 'Sigiriya', 'Galewela', 'Rattota', 'Ukuwela'] },
  { id: 'nuwara_eliya', district: 'Nuwara Eliya', cities: ['Nuwara Eliya', 'Hatton', 'Talawakelle', 'Kotagala', 'Walapane', 'Ragala'] },
  { id: 'galle', district: 'Galle', cities: ['Galle', 'Hikkaduwa', 'Unawatuna', 'Karapitiya', 'Baddegama', 'Ambalangoda', 'Elpitiya', 'Bentota', 'Balapitiya', 'Habaraduwa'] },
  { id: 'matara', district: 'Matara', cities: ['Matara', 'Weligama', 'Mirissa', 'Dikwella', 'Akuressa', 'Devinuwara', 'Deniyaya', 'Kotapola', 'Hakmana'] },
  { id: 'hambantota', district: 'Hambantota', cities: ['Hambantota', 'Tangalle', 'Tissamaharama', 'Ambalantota', 'Weeraketiya', 'Beliatta', 'Suriyawewa'] },
  { id: 'jaffna', district: 'Jaffna', cities: ['Jaffna', 'Nallur', 'Chavakachcheri', 'Point Pedro', 'Kilinochchi', 'Chunnakam', 'Kopay', 'Manipay'] },
  { id: 'kurunegala', district: 'Kurunegala', cities: ['Kurunegala', 'Kuliyapitiya', 'Narammala', 'Pannala', 'Nikaweratiya', 'Mawathagama', 'Polgahawela', 'Alawwa'] },
  { id: 'puttalam', district: 'Puttalam', cities: ['Puttalam', 'Chilaw', 'Marawila', 'Wennappuwa', 'Nattandiya', 'Mahawewa', 'Anamaduwa'] },
  { id: 'anuradhapura', district: 'Anuradhapura', cities: ['Anuradhapura', 'Kekirawa', 'Mihintale', 'Medawachchiya', 'Eppawala', 'Horowpothana', 'Kebithigollewa'] },
  { id: 'polonnaruwa', district: 'Polonnaruwa', cities: ['Polonnaruwa', 'Medirigiriya', 'Kaduruwela', 'Hingurakgoda', 'Elahera'] },
  { id: 'badulla', district: 'Badulla', cities: ['Badulla', 'Bandarawela', 'Haputale', 'Ella', 'Welimada', 'Mahiyanganaya', 'Passara', 'Hali-Ela'] },
  { id: 'monaragala', district: 'Monaragala', cities: ['Monaragala', 'Bibile', 'Wellawaya', 'Buttala', 'Siyambalanduwa', 'Medagama'] },
  { id: 'ratnapura', district: 'Ratnapura', cities: ['Ratnapura', 'Embilipitiya', 'Balangoda', 'Pelmadulla', 'Eheliyagoda', 'Kiriella', 'Kalawana'] },
  { id: 'kegalle', district: 'Kegalle', cities: ['Kegalle', 'Mawanella', 'Warakapola', 'Rambukkana', 'Ruwanwella', 'Galigamuwa', 'Deraniyagala'] },
  { id: 'ampara', district: 'Ampara', cities: ['Ampara', 'Kalmunai', 'Akkaraipattu', 'Sammanthurai', 'Pottuvil', 'Mahaoya'] },
  { id: 'batticaloa', district: 'Batticaloa', cities: ['Batticaloa', 'Eravur', 'Kattankudy', 'Valaichchenai', 'Oddamavadi', 'Chenkaladi'] },
  { id: 'trincomalee', district: 'Trincomalee', cities: ['Trincomalee', 'Kinniya', 'Mutur', 'Kantalai', 'Thampalakamam'] },
  { id: 'mannar', district: 'Mannar', cities: ['Mannar', 'Nanattan', 'Madhu', 'Musali'] },
  { id: 'vavuniya', district: 'Vavuniya', cities: ['Vavuniya', 'Cheddikulam', 'Omanthai'] },
  { id: 'mullaitivu', district: 'Mullaitivu', cities: ['Mullaitivu', 'Puthukkudiyiruppu', 'Oddusudan'] },
  { id: 'kilinochchi', district: 'Kilinochchi', cities: ['Kilinochchi', 'Pallai', 'Paranthan'] },
];

export const getAllDistricts = (): string[] =>
  locations.map(l => l.district).sort();

export const getCitiesByDistrict = (district: string): string[] => {
  const loc = locations.find(l => l.district === district);
  return loc ? loc.cities : [];
};
