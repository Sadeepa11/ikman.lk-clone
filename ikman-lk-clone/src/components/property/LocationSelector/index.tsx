import { Dropdown } from '../Dropdown';
import { locations, getCitiesByDistrict } from '../../../data/locations';

interface LocationSelectorProps {
  district: string;
  city: string;
  onDistrictChange: (district: string) => void;
  onCityChange: (city: string) => void;
}

export const LocationSelector = ({ district, city, onDistrictChange, onCityChange }: LocationSelectorProps) => {
  const districtOptions = [
    { value: '', label: 'All Districts' },
    ...locations.map(l => ({ value: l.district, label: l.district })),
  ];

  const cityOptions = [
    { value: '', label: 'All Cities' },
    ...getCitiesByDistrict(district).map(c => ({ value: c, label: c })),
  ];

  return (
    <div className="space-y-2">
      <Dropdown
        value={district}
        onChange={v => { onDistrictChange(v); onCityChange(''); }}
        options={districtOptions}
        placeholder="All Districts"
        label="District"
      />
      {district && (
        <Dropdown
          value={city}
          onChange={onCityChange}
          options={cityOptions}
          placeholder="All Cities"
          label="City"
        />
      )}
    </div>
  );
};
