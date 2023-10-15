import {
  Garden,
  Kitchen,
  Long,
  Parking,
  Pets,
  Private,
  TV,
  Wifi,
} from '../icons/PerksIcons'

/* eslint-disable react/prop-types */
function PerksLabel({ selected, onChange }) {
  const labelClass = 'flex border gap-2 p-4 align-center cursor-pointer'

  function handleCheck(ev) {
    const { name, checked } = ev.target
    if (checked) {
      onChange([...selected, name])
    } else {
      const unchecked = selected.filter((selectedName) => selectedName !== name)
      onChange([...unchecked])
    }
  }

  return (
    <>
      <label className={labelClass}>
        <input
          type="checkbox"
          checked={selected.includes('wifi')}
          name="wifi"
          onChange={handleCheck}
        />
        <Wifi />
        <span>Wifi</span>
      </label>
      <label className={labelClass}>
        <input
          type="checkbox"
          checked={selected.includes('parking')}
          name="parking"
          onChange={handleCheck}
        />
        <Parking />
        <span>Free Parking Spot</span>
      </label>
      <label className={labelClass}>
        <input
          type="checkbox"
          checked={selected.includes('tv')}
          name="tv"
          onChange={handleCheck}
        />
        <TV />
        <span>TV</span>
      </label>
      <label className={labelClass}>
        <input
          type="checkbox"
          checked={selected.includes('pets')}
          name="pets"
          onChange={handleCheck}
        />
        <Pets />
        <span>Pets</span>
      </label>
      <label className={labelClass}>
        <input
          type="checkbox"
          checked={selected.includes('private')}
          name="private"
          onChange={handleCheck}
        />
        <Private />
        <span>Private Entrance</span>
      </label>
      <label className={labelClass}>
        <input
          type="checkbox"
          checked={selected.includes('long')}
          name="long"
          onChange={handleCheck}
        />
        <Long />
        <span>Long Term Stay</span>
      </label>
      <label className={labelClass}>
        <input
          type="checkbox"
          checked={selected.includes('kitchen')}
          name="kitchen"
          onChange={handleCheck}
        />
        <Kitchen />
        <span>Kitchen</span>
      </label>
      <label className={labelClass}>
        <input
          type="checkbox"
          checked={selected.includes('garden')}
          name="garden"
          onChange={handleCheck}
        />
        <Garden />
        <span>Garden Access</span>
      </label>
    </>
  )
}

export default PerksLabel
