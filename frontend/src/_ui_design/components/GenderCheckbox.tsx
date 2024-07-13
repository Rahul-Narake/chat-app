const GenderCheckbox = ({
  selectedGender,
  handleGenderChange,
}: {
  selectedGender: string;
  handleGenderChange: (gender: 'male' | 'female') => void;
}) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-200 "
            checked={selectedGender === 'male'}
            onChange={() => {
              handleGenderChange('male');
            }}
          />
        </label>
      </div>
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            className="checkbox border-slate-200"
            checked={selectedGender === 'female'}
            onChange={() => {
              handleGenderChange('female');
            }}
          />
        </label>
      </div>
    </div>
  );
};
export default GenderCheckbox;
